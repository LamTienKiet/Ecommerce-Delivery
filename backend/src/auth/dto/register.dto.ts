import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  phone!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(8)
  password!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(8)
  confirmPassword!: string;
}
