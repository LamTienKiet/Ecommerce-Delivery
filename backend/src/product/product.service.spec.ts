import { ProductService } from './product.service';
import { clearCatalogCache } from 'src/common/catalog-cache';

describe('ProductService.findAll', () => {
  const pizza = { id: 1, name: 'Pizza' };
  const pasta = { id: 2, name: 'Pasta' };
  const rows = [
    { id: 10, name: 'Margherita', categoryId: 1 },
    { id: 11, name: 'Carbonara', categoryId: 2 },
  ];
  const prisma = { product: { findMany: jest.fn(), count: jest.fn() } };
  const categoryService = { findAll: jest.fn() };
  const service = new ProductService(categoryService as any, prisma as any);

  beforeEach(() => {
    jest.clearAllMocks();
    clearCatalogCache();
    prisma.product.findMany.mockResolvedValue(rows);
    prisma.product.count.mockResolvedValue(25);
    categoryService.findAll.mockResolvedValue([pizza, pasta]);
  });

  it('keeps search, filter, sort and paging in one query and attaches categories', async () => {
    const result = await service.findAll(3, 12, 4, 'a', 'true', 'price-asc');

    expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      where: {
        categoryId: 4,
        isAvailable: true,
        OR: [{ name: { contains: 'a' } }, { description: { contains: 'a' } }],
      },
      skip: 24,
      take: 12,
      orderBy: { price: 'asc' },
    });
    expect(prisma.product.count).toHaveBeenCalledWith({
      where: prisma.product.findMany.mock.calls[0][0].where,
    });
    expect(result).toEqual({
      data: [
        { ...rows[0], category: pizza },
        { ...rows[1], category: pasta },
      ],
      meta: { totalItems: 25, currentPage: 3, totalPages: 3, itemsPerPage: 12 },
    });
  });

  it('falls back to loading categories with the products when one is missing from the list', async () => {
    categoryService.findAll.mockResolvedValue([pizza]);
    const withCategories = rows.map((row) => ({ ...row, category: { id: row.categoryId } }));
    prisma.product.findMany.mockResolvedValueOnce(rows).mockResolvedValueOnce(withCategories);

    const result = await service.findAll(1, 12, undefined, 'a');

    expect(prisma.product.findMany).toHaveBeenLastCalledWith({
      where: { id: { in: [10, 11] } },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    expect(result.data).toBe(withCategories);
  });

  it('does not cache search results', async () => {
    await service.findAll(1, 12, undefined, 'a');
    await service.findAll(1, 12, undefined, 'a');
    expect(prisma.product.findMany).toHaveBeenCalledTimes(2);
  });
});
