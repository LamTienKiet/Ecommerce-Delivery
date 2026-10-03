import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService], // Export để các module khác (như NotificationModule) có thể sử dụng
})
export class EmailModule {}
