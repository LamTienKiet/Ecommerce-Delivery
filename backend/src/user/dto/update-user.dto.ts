import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  roleName?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
