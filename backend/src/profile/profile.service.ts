import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto } from './dto/changePassword.dto';

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

  changePassword(accountId: number, changePasswordDto: ChangePasswordDto) {
    return this.prismaService.account.update({
      where: {},
    });
  }
}
