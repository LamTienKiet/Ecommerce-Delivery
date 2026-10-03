import { Controller, Get, Param, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.notificationService.findAllByUser(+userId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(+id);
  }
}
