import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  @IsPositive()
  productId!: number;

  @IsInt()
  @IsPositive()
  quantity!: number;

  @IsNumber()
  @IsPositive()
  price!: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  shippingAddress!: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}
