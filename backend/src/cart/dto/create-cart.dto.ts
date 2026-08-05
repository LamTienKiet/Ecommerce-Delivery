import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateCartDto {
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  @IsInt()
  @IsNotEmpty()
  productId!: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity!: number;
}
