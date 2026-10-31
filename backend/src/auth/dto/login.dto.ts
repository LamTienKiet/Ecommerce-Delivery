import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  // no length rule here: change-password allows passwords longer than register's max
  @IsNotEmpty()
  @IsString()
  password!: string;
}
