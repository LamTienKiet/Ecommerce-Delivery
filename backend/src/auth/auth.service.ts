import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SignInData, AuthInput, AuthResult } from './auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('');
    }
    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const account = await this.prismaService.account.findUnique({
      where: {
        username: input.username,
      },

      include: {
        role: true,
        user: true,
      },
    });
    if (!account || account.status !== 'ACTIVE') {
      return null;
    }

    if (account.password === input.password) {
      return {
        id: account.user?.id || 0,
        accountId: account.id,
        username: account.username,
        role: account.role.name,
      };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.id,
      accountId: user.accountId,
      username: user.username,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return {
      accessToken,
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }
}
