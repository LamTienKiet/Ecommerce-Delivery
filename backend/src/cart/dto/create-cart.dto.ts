import { IsInt, IsNotEmpty, IsPositive, IsString, IsOptional } from 'class-validator';
export class CreateCartDto {
  @IsInt()
  @IsNotEmpty()
  productId!: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity!: number;

  @IsString()
  @IsOptional()
  note?: string;
}
