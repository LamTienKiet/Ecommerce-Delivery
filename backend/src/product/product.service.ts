import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { cachedCatalog, clearCatalogCache } from 'src/common/catalog-cache';

@Injectable()
export class ProductService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prismaService.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        imageUrl: createProductDto.imageUrl,
        price: createProductDto.price,
        isAvailable: createProductDto.isAvailable,
        preparationTime: createProductDto.preparationTime,

        category: {
          connect: {
            id: Number(createProductDto.categoryId),
          },
        },
      },

      include: {
        category: true,
      },
    });
    clearCatalogCache();
    return product;
  }

  async findAll(
    page: number = 1, 
    limit: number = 10, 
    categoryId?: number,
    search?: string,
    isAvailable?: string,
    sortBy?: string,
  ) {
    //tinh toan sl sp moi trang bo qua
    const skip = (page - 1) * limit;

    const where: any = {};
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } }
      ];
    }
    if (isAvailable !== undefined) {
      where.isAvailable = isAvailable === 'true';
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'price-asc') orderBy = { price: 'asc' };
    else if (sortBy === 'price-desc') orderBy = { price: 'desc' };
    else if (sortBy === 'name-asc') orderBy = { name: 'asc' };
    else if (sortBy === 'newest') orderBy = { createdAt: 'desc' };

    const load = async () => {
      // categories come from the cached category list: one database round trip less per request
      const [products, total, categories] = await Promise.all([
        this.prismaService.product.findMany({
          where: where,
          skip: skip,
          take: limit,
          orderBy: orderBy,
        }),
        this.prismaService.product.count({ where }),
        this.categoryService.findAll(),
      ]);
      const categoryById = new Map(categories.map((category) => [category.id, category]));
      const data = products.every((product) => categoryById.has(product.categoryId))
        ? products.map((product) => ({ ...product, category: categoryById.get(product.categoryId)! }))
        : await this.prismaService.product.findMany({
            where: { id: { in: products.map((product) => product.id) } },
            include: { category: true },
            orderBy: orderBy,
          });
      const totalPages = Math.ceil(total / limit);

      return {
        data,
        meta: {
          totalItems: total,
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: limit,
        },
      };
    };

    // search text is unbounded, so caching it would mostly store one-off results
    if (search) {
      return load();
    }
    return cachedCatalog(
      `products:${JSON.stringify([page, limit, categoryId, isAvailable, sortBy])}`,
      load,
    );
  }

  findOne(id: number) {
    return cachedCatalog(`product:${id}`, () =>
      this.prismaService.product.findUnique({
        where: {
          id: id,
        },
        include: {
          category: true,
        },
      }),
    );
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prismaService.product.update({
      where: {
        id: id,
      },
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        imageUrl: updateProductDto.imageUrl,
        price: updateProductDto.price,
        isAvailable: updateProductDto.isAvailable,
        preparationTime: updateProductDto.preparationTime,

        category: updateProductDto.categoryId
          ? {
              connect: {
                id: Number(updateProductDto.categoryId),
              },
            }
          : undefined,
      },
      include: {
        category: true,
      },
    });
    clearCatalogCache();
    return product;
  }

  async remove(id: number) {
    const product = await this.prismaService.product.delete({
      where: {
        id: id,
      },
    });
    clearCatalogCache();
    return product;
  }
}
