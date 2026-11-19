import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { cachedCatalog, clearCatalogCache } from 'src/common/catalog-cache';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prismaService.category.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
      },
    });
    clearCatalogCache();
    return category;
  }

  findAll() {
    return cachedCatalog('categories', () =>
      this.prismaService.category.findMany(),
    );
  }

  findOne(id: number) {
    return cachedCatalog(`category:${id}`, () =>
      this.prismaService.category.findUnique({
        where: {
          id: id,
        },
      }),
    );
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prismaService.category.update({
      where: {
        id: id,
      },
      data: {
        name: updateCategoryDto.name,
        description: updateCategoryDto.description,
      },
    });
    clearCatalogCache();
    return category;
  }

  async remove(id: number) {
    const category = await this.prismaService.category.delete({
      where: {
        id: id,
      },
    });
    clearCatalogCache();
    return category;
  }
}
