import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  description!: string;

  @IsUrl()
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
