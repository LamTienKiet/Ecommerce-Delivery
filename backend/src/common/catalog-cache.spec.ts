import { cachedCatalog, clearCatalogCache } from './catalog-cache';

describe('cachedCatalog', () => {
  beforeEach(() => clearCatalogCache());
  afterEach(() => jest.restoreAllMocks());

  it('shares one load between concurrent callers', async () => {
    const load = jest.fn().mockResolvedValue('data');
    await expect(
      Promise.all([cachedCatalog('k', load), cachedCatalog('k', load)]),
    ).resolves.toEqual(['data', 'data']);
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('reloads after the entry expires', async () => {
    const now = jest.spyOn(Date, 'now').mockReturnValue(0);
    const load = jest.fn().mockResolvedValue('data');
    await cachedCatalog('k', load);
    now.mockReturnValue(30_000);
    await cachedCatalog('k', load);
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('reloads after the cache is cleared', async () => {
    const load = jest.fn().mockResolvedValue('data');
    await cachedCatalog('k', load);
    clearCatalogCache();
    await cachedCatalog('k', load);
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('does not keep a failed load', async () => {
    const load = jest.fn().mockRejectedValueOnce(new Error('db')).mockResolvedValue('data');
    await expect(cachedCatalog('k', load)).rejects.toThrow('db');
    await expect(cachedCatalog('k', load)).resolves.toBe('data');
  });

  it('stays bounded when keys keep changing', async () => {
    const first = jest.fn().mockResolvedValue('data');
    await cachedCatalog('first', first);
    for (let i = 0; i < 500; i++) {
      await cachedCatalog(`key-${i}`, async () => i);
    }
    await cachedCatalog('first', first);
    expect(first).toHaveBeenCalledTimes(2);
  });
});
