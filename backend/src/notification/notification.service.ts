import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async createNotification(userId: number, dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        userId,
        title: dto.title,
        message: dto.message,
      },
    });
  }

  async findAllByUser(userId: number) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: number) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
