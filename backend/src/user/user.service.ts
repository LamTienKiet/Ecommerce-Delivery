import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        account: {
          include: {
            role: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        account: {
          include: {
            role: true,
          }
        }
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { account: true }
    });

    if (!user || !user.account) {
      throw new NotFoundException('User or Account not found');
    }

    const dataToUpdate: any = {};
    if (updateUserDto.status) {
      dataToUpdate.status = updateUserDto.status;
    }

    if (updateUserDto.roleName) {
      const role = await this.prisma.role.findUnique({
        where: { name: updateUserDto.roleName }
      });
      if (role) {
        dataToUpdate.roleId = role.id;
      }
    }

    if (Object.keys(dataToUpdate).length > 0) {
      await this.prisma.account.update({
        where: { id: user.accountId },
        data: dataToUpdate
      });
    }

    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
