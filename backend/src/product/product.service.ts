import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly prismaService: PrismaService,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
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
  }

  async findAll(page: number = 1, limit: number = 10) {
    //tinh toan sl sp moi trang bo qua
    const skip = (page - 1) * limit;

    const products = await this.prismaService.product.findMany({
      skip: skip,
      take: limit,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prismaService.product.count();
    const totalPages = Math.ceil(total / limit);

    return {
      data: products,
      meta: {
        totalItems: total,
        currentPage: page,
        totalPages: totalPages,
        itemsPerPage: limit,
      },
    };
  }

  findOne(id: number) {
    return this.prismaService.product.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
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
  }

  remove(id: number) {
    return this.prismaService.product.delete({
      where: {
        id: id,
      },
    });
  }
}
