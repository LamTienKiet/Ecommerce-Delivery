import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationListener } from './notification.listener';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationListener],
})
export class NotificationModule {}
