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
            id: createProductDto.categoryId,
          },
        },
      },

      include: {
        category: true,
      },
    });
  }

  findAll() {
    return this.prismaService.product.findMany({
      include: {
        category: true,
      },
    });
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
                id: updateProductDto.categoryId,
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
