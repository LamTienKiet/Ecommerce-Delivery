import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  @IsNotEmpty()
  imageUrl!: string;

  // Prisma Decimal is serialized as a string, so the edit form sends it back as one
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price!: number;

  @IsBoolean()
  isAvailable!: boolean;

  @IsInt()
  preparationTime!: number;

  @IsInt()
  categoryId!: number;
}
