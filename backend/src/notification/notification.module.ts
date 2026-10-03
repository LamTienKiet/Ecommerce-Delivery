import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationListener } from './notification.listener';
import { EmailModule } from '../email/email.module';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [EmailModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationListener, NotificationGateway],
})
export class NotificationModule {}
