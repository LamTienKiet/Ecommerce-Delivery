import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryController } from '../category/category.controller';
import { CategoryService } from 'src/category/category.service';

@Module({
  controllers: [ProductController, CategoryController],
  providers: [ProductService, CategoryService],
})
export class ProductModule {}
