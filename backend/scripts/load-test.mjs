// Read-only load test for the public catalog API.
// Usage: npm run load-test -- [baseUrl] [connections] [secondsPerEndpoint]
const [baseUrl = 'http://localhost:3000', connectionsArg = '50', secondsArg = '15'] =
  process.argv.slice(2);
const connections = Number(connectionsArg);
const seconds = Number(secondsArg);

if (!Number.isInteger(connections) || connections < 1 || !(seconds > 0)) {
  console.error('connections must be a positive integer and seconds must be positive');
  process.exit(2);
}

function percentile(sorted, ratio) {
  if (sorted.length === 0) return 0;
  return sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * ratio) - 1)];
}

async function measure(path) {
  const latencies = [];
  let errors = 0;
  const startedAt = performance.now();
  const stopAt = startedAt + seconds * 1000;

  await Promise.all(
    Array.from({ length: connections }, async () => {
      while (performance.now() < stopAt) {
        const requestStartedAt = performance.now();
        try {
          const response = await fetch(baseUrl + path);
          await response.arrayBuffer();
          if (response.ok) latencies.push(performance.now() - requestStartedAt);
          else errors++;
        } catch {
          errors++;
        }
      }
    }),
  );

  const elapsedSeconds = (performance.now() - startedAt) / 1000;
  latencies.sort((a, b) => a - b);
  return {
    endpoint: path,
    'req/s': Math.round(latencies.length / elapsedSeconds),
    'p50 ms': Math.round(percentile(latencies, 0.5)),
    'p95 ms': Math.round(percentile(latencies, 0.95)),
    'p99 ms': Math.round(percentile(latencies, 0.99)),
    errors,
  };
}

const listResponse = await fetch(`${baseUrl}/product?page=1&limit=12`);
if (!listResponse.ok) {
  console.error(`Cannot reach ${baseUrl}/product (HTTP ${listResponse.status})`);
  process.exit(2);
}
const firstProduct = (await listResponse.json()).data[0];

const paths = [
  '/category',
  '/product?page=1&limit=12',
  ...(firstProduct
    ? [
        `/product/${firstProduct.id}`,
        `/product?page=1&limit=12&categoryId=${firstProduct.categoryId}`,
      ]
    : []),
  // search is never cached, so this row shows the cost of reaching the database
  '/product?page=1&limit=12&search=a',
];

console.log(`${baseUrl}: ${connections} connections, ${seconds}s per endpoint`);
const results = [];
for (const path of paths) results.push(await measure(path));
console.table(results);

if (results.some((result) => result.errors > 0)) process.exitCode = 1;
