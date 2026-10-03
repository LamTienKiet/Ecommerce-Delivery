import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UpdateEmailDto } from './dto/updateEmail.dto';
import { availableMemory, emit } from 'process';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  getProfile(accountId: number) {
    return this.prismaService.account.findUnique({
      where: {
        id: accountId,
      },
      include: {
        user: true,
      },
    });
  }

  updateProfile(accountId: number, updateProfileDto: UpdateProfileDto) {
    return this.prismaService.user.update({
      where: {
        accountId,
      },
      data: updateProfileDto,
    });
  }

  async updateEmail(accountId: number, updateEmailDto: UpdateEmailDto) {
    const existEmail = await this.prismaService.account.findUnique({
      where: { email: updateEmailDto.newEmail },
    });

    if (existEmail) {
      throw new BadRequestException(
        'This email is exist, please choose another email',
      );
    }
    const updatedAccount = await this.prismaService.account.update({
      where: { id: accountId },
      data: {
        email: updateEmailDto.newEmail,
      },
      select: { id: true, email: true },
    });

    return {
      message: 'Update Email Successfully',
      email: updatedAccount.email,
    };
  }

  async updateAvatar(accountId: number, imageUrl: string) {
    const user = await this.prismaService.user.findUnique({
      where: { accountId },
    });

    if (!user) {
      throw new BadRequestException("Can't find this user profile");
    }

    const updatedAvatar = await this.prismaService.user.update({
      where: { accountId },
      data: { avatar: imageUrl },
    });

    return {
      message: 'Update avatar successfully',
      imageUrl: updatedAvatar.avatar,
    };
  }

  async changePassword(
    accountId: number,
    updatePasswordDto: ChangePasswordDto,
  ) {
    const account = await this.prismaService.account.findUnique({
      where: { id: accountId },
    });
    if (!account) {
      throw new BadRequestException('This account is exists');
    }

    const isPasswordValid = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      account.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Old password is not correct');
    }

    const hashedNewPassword = await bcrypt.hash(
      updatePasswordDto.newPassword,
      10,
    );

    await this.prismaService.account.update({
      where: { id: accountId },
      data: {
        password: hashedNewPassword,
      },
    });
    return { message: 'Change Password Successfully' };
  }
}
