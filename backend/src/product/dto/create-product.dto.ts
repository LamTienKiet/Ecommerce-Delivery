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
