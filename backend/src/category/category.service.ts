import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
      },
    });
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  findOne(id: number) {
    return this.prismaService.category.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      where: {
        id: id,
      },
      data: {
        name: updateCategoryDto.name,
        description: updateCategoryDto.description,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.category.delete({
      where: {
        id: id,
      },
    });
  }
}
