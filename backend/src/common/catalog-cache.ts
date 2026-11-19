const TTL_MS = 30_000;
const MAX_ENTRIES = 500;

// shortcut: per-process cache, other processes can serve data up to 30s old; move to Redis when running several instances
const entries = new Map<string, { expiresAt: number; value: Promise<unknown> }>();

// Stores the promise so concurrent misses for one key share a single database query.
export function cachedCatalog<T>(key: string, load: () => PromiseLike<T>): Promise<T> {
  const hit = entries.get(key);
  if (hit && hit.expiresAt > Date.now()) {
    return hit.value as Promise<T>;
  }

  if (entries.size >= MAX_ENTRIES) {
    entries.clear();
  }

  const value = Promise.resolve().then(load);
  const entry = { expiresAt: Date.now() + TTL_MS, value };
  entries.set(key, entry);
  value.catch(() => {
    if (entries.get(key) === entry) {
      entries.delete(key);
    }
  });
  return value;
}

export function clearCatalogCache() {
  entries.clear();
}
