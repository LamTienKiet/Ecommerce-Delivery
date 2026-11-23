// Simulates real shoppers: register, log in, browse, search, add to cart, order (cash), check orders.
// WRITES DATA (accounts, carts, orders). Run it only against a throwaway database with SMTP_USER unset.
// Usage: npm run journey-test -- <baseUrl> [users] [seconds] --write
const args = process.argv.slice(2).filter((arg) => arg !== '--write');
if (!process.argv.includes('--write') || !args[0]) {
  console.error('Usage: npm run journey-test -- <baseUrl> [users] [seconds] --write');
  console.error('This creates accounts and orders. Point it at a test database only.');
  process.exit(2);
}
const [baseUrl, usersArg = '100', secondsArg = '60'] = args;
const users = Number(usersArg);
const seconds = Number(secondsArg);
if (!Number.isInteger(users) || users < 1 || !(seconds > 0)) {
  console.error('users must be a positive integer and seconds must be positive');
  process.exit(2);
}

const RAMP_UP_MS = Math.min(20_000, seconds * 250);
const runId = Date.now().toString(36);
const stats = new Map();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// people pause 1-4s between clicks
const think = () => sleep(1000 + Math.random() * 3000);
const pick = (items) => items[Math.floor(Math.random() * items.length)];

async function call(step, method, path, { token, body } = {}) {
  const startedAt = performance.now();
  let entry = stats.get(step);
  if (!entry) stats.set(step, (entry = { latencies: [], errors: 0, firstError: '' }));
  try {
    const response = await fetch(baseUrl + path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await response.text();
    if (!response.ok) throw new Error(`HTTP ${response.status} ${text.slice(0, 120)}`);
    entry.latencies.push(performance.now() - startedAt);
    return text ? JSON.parse(text) : null;
  } catch (error) {
    entry.errors++;
    entry.firstError ||= error.message;
    return null;
  }
}

async function shopper(index, stopAt) {
  await sleep((RAMP_UP_MS * index) / users);
  const username = `lt_${runId}_${index}`;
  const password = 'Load1234';
  const registered = await call('register', 'POST', '/auth/register', {
    body: {
      fullName: `Load Test ${index}`,
      email: `${username}@loadtest.invalid`,
      username,
      phone: String(1_000_000_000 + index).slice(0, 10),
      password,
      confirmPassword: password,
    },
  });
  if (!registered) return;
  const session = await call('login', 'POST', '/auth/login', { body: { username, password } });
  if (!session) return;
  const token = session.accessToken;

  const categories = (await call('category list', 'GET', '/category')) || [];
  while (performance.now() < stopAt) {
    await think();
    const category = categories.length ? pick(categories) : undefined;
    const list = await call(
      'product list',
      'GET',
      `/product?page=${1 + Math.floor(Math.random() * 3)}&limit=9${category ? `&categoryId=${category.id}` : ''}`,
    );
    const products = list?.data?.length ? list.data : [];

    if (Math.random() < 0.3) {
      await think();
      await call('search', 'GET', `/product?page=1&limit=9&search=${pick(['a', 'bò', 'pasta', 'steak', 'súp'])}`);
    }
    if (!products.length) continue;

    await think();
    const product = pick(products);
    await call('product detail', 'GET', `/product/${product.id}`);

    if (Math.random() < 0.5) {
      await think();
      await call('add to cart', 'POST', '/cart', {
        token,
        body: { productId: product.id, quantity: 1 + Math.floor(Math.random() * 2) },
      });
      await call('view cart', 'GET', '/cart', { token });

      if (Math.random() < 0.4) {
        await think();
        await call('place order', 'POST', '/order', {
          token,
          body: {
            fullName: `Load Test ${index}`,
            phone: '0900000000',
            shippingAddress: '1 Test Street',
            paymentMethod: 'cash',
            orderType: 'delivery',
          },
        });
        await call('my orders', 'GET', '/order', { token });
        await call('notifications', 'GET', '/notification', { token });
      }
    }
  }
}

function percentile(sorted, ratio) {
  if (sorted.length === 0) return 0;
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * ratio) - 1)];
}

console.log(`${baseUrl}: ${users} shoppers, ${RAMP_UP_MS / 1000}s ramp-up, ${seconds}s total, run ${runId}`);
const startedAt = performance.now();
const stopAt = startedAt + seconds * 1000;
await Promise.all(Array.from({ length: users }, (_, index) => shopper(index, stopAt)));
const elapsed = (performance.now() - startedAt) / 1000;

const rows = [...stats].map(([step, { latencies, errors }]) => {
  latencies.sort((a, b) => a - b);
  return {
    step,
    requests: latencies.length + errors,
    'p50 ms': Math.round(percentile(latencies, 0.5)),
    'p95 ms': Math.round(percentile(latencies, 0.95)),
    'p99 ms': Math.round(percentile(latencies, 0.99)),
    errors,
  };
});
const total = rows.reduce((sum, row) => sum + row.requests, 0);
console.table(rows);
console.log(`total ${total} requests in ${elapsed.toFixed(0)}s = ${(total / elapsed).toFixed(1)} req/s`);
for (const [step, { firstError }] of stats) if (firstError) console.log(`first error in ${step}: ${firstError}`);
if (rows.some((row) => row.errors > 0)) process.exitCode = 1;
