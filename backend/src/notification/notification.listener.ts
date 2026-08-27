import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../order/events/order-created.event';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationListener {
  constructor(private notificationService: NotificationService) {}

  @OnEvent('order.created', { async: true })
  async handleOrderCreatedEvent(event: OrderCreatedEvent) {
    console.log(`[Event-Driven] Bắt được sự kiện order.created cho đơn hàng #${event.orderId}`);

    // 1. Tạo In-app Notification
    const dto: CreateNotificationDto = {
      title: 'Đặt hàng thành công',
      message: `Đơn hàng #${event.orderId} của bạn đã được tiếp nhận và đang chờ xử lý. Tổng tiền: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(event.totalAmount)}`,
    };
    await this.notificationService.createNotification(event.userId, dto);
    console.log(`[Event-Driven] Đã tạo Notification cho user ${event.userId}`);

    // 2. Giả lập gửi Email
    if (event.email) {
      console.log(`[Event-Driven] [Mock Email] Đã gửi email xác nhận đơn hàng #${event.orderId} tới ${event.email}`);
    }
  }
}
