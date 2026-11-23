import { ProductController } from './product.controller';

describe('ProductController.findAll paging', () => {
  const service = { findAll: jest.fn() };
  const controller = new ProductController(service as any, {} as any);

  beforeEach(() => jest.clearAllMocks());

  it.each([
    [undefined, undefined, 1, 10],
    ['2', '50', 2, 50],
    ['-3', '100000', 1, 100],
    ['abc', '0', 1, 10],
    ['1', '-5', 1, 1],
  ])('page=%s limit=%s becomes %i and %i', (page, limit, expectedPage, expectedLimit) => {
    controller.findAll(page, limit);
    expect(service.findAll.mock.calls[0].slice(0, 2)).toEqual([expectedPage, expectedLimit]);
  });
});
