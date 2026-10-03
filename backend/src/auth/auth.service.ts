import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import {
  SignInData,
  AuthInput,
  AuthResult,
  SignUpData,
} from './auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterResponseDto } from './dto/register-respone.dto';

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

    if (await bcrypt.compare(input.password, account.password)) {
      if (!account.user) {
        throw new InternalServerErrorException('Tài khoản thiếu dữ liệu user liên kết');
      }
      return {
        id: account.user.id,
        accountId: account.id,
        username: account.username,
        role: account.role.name,
        email: account.email,
        fullName: account.user.fullName || '',
        phone: account.user.phone || null,
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
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    // Generate Refresh Token
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7); // 7 days expiration

    await this.prismaService.refreshToken.create({
      data: {
        token: refreshToken,
        expiredAt,
        accountId: user.accountId,
      },
    });

    return {
      accessToken,
      refreshToken,
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
    };
  }

  async refreshToken(token: string): Promise<AuthResult> {
    const existingToken = await this.prismaService.refreshToken.findUnique({
      where: { token },
      include: {
        account: {
          include: { role: true, user: true },
        },
      },
    });

    if (!existingToken) {
      throw new UnauthorizedException('Refresh token không hợp lệ');
    }

    if (new Date() > existingToken.expiredAt) {
      await this.prismaService.refreshToken.delete({ where: { id: existingToken.id } });
      throw new UnauthorizedException('Refresh token đã hết hạn');
    }

    const account = existingToken.account;
    if (account.status !== 'ACTIVE') {
      throw new UnauthorizedException('Tài khoản đã bị khóa');
    }

    if (!account.user) {
      throw new InternalServerErrorException('Tài khoản thiếu dữ liệu user liên kết');
    }

    const userData: SignInData = {
      id: account.user.id,
      accountId: account.id,
      username: account.username,
      role: account.role.name,
      email: account.email,
      fullName: account.user.fullName || '',
      phone: account.user.phone || null,
    };

    const tokenPayload = {
      sub: userData.id,
      accountId: userData.accountId,
      username: userData.username,
      role: userData.role,
      email: userData.email,
      fullName: userData.fullName,
      phone: userData.phone,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);
    const newRefreshToken = crypto.randomBytes(40).toString('hex');
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7);

    // Xóa token cũ và tạo token mới trong cùng 1 transaction (Token Rotation an toàn)
    await this.prismaService.$transaction([
      this.prismaService.refreshToken.delete({ where: { id: existingToken.id } }),
      this.prismaService.refreshToken.create({
        data: {
          token: newRefreshToken,
          expiredAt,
          accountId: userData.accountId,
        },
      }),
    ]);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      id: userData.id,
      username: userData.username,
      role: userData.role,
      email: userData.email,
      fullName: userData.fullName,
      phone: userData.phone,
    };
  }

  async register(input: SignUpData): Promise<RegisterResponseDto> {
    const account = await this.prismaService.account.findUnique({
      where: {
        username: input.username,
      },
    });

    const userRole = await this.prismaService.role.findUnique({
      where: {
        name: 'USER',
      },
    });

    const emailExist = await this.prismaService.account.findUnique({
      where: {
        email: input.email,
      },
    });

    if (input.confirmPassword !== input.password) {
      throw new BadRequestException("Password don't match");
    }

    if (account) {
      throw new BadRequestException('Username already exists');
    }

    if (emailExist) {
      throw new BadRequestException('Email already exists');
    }

    if (!userRole) {
      throw new InternalServerErrorException('Role not found');
    }
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const newAccount = await this.prismaService.account.create({
      data: {
        username: input.username,
        email: input.email,
        password: hashedPassword,
        status: 'ACTIVE',
        role: {
          connect: {
            id: userRole.id,
          },
        },

        user: {
          create: {
            fullName: input.fullName,
            phone: input.phone,
          },
        },
      },

      include: {
        role: true,
        user: true,
      },
    });

    return {
      id: newAccount.id,
      fullName: newAccount.user!.fullName,
      username: newAccount.username,
      email: newAccount.email,
      phone: newAccount.user!.phone ?? '',
    };
  }
}
