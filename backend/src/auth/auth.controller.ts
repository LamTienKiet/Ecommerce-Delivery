import { Body, Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  // slows password guessing: 10 attempts per minute per IP
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  login(@Body() input: LoginDto) {
    return this.authService.authenticate(input);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  register(@Body() input: RegisterDto) {
    return this.authService.register(input);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
