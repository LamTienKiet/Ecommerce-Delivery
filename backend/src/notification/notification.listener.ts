import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../order/events/order-created.event';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class NotificationListener {
  constructor(
    private notificationService: NotificationService,
    private emailService: EmailService,
  ) {}

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

    // 2. Gửi Email thực tế qua NodeMailer
    if (event.email) {
      try {
        console.log(`[Event-Driven] Đang gửi email xác nhận đơn hàng #${event.orderId} tới ${event.email}...`);
        await this.emailService.sendOrderConfirmation(
          event.email,
          event.orderId,
          event.totalAmount,
        );
      } catch (error) {
        console.error(`[Event-Driven] Lỗi khi gửi email:`, error);
      }
    }
  }

  @OnEvent('order.status_updated', { async: true })
  async handleOrderStatusUpdatedEvent(payload: { userId: number; orderId: number; status: string; email?: string }) {
    console.log(`[Event-Driven] Bắt được sự kiện order.status_updated cho đơn hàng #${payload.orderId}`);

    // 1. Tạo In-app Notification
    let statusText = payload.status;
    switch(payload.status) {
      case 'COMPLETED': statusText = 'Đã giao thành công'; break;
      case 'DELIVERING': statusText = 'Đang giao hàng'; break;
      case 'CANCELLED': statusText = 'Đã bị hủy'; break;
      case 'PREPARING': statusText = 'Đang chuẩn bị'; break;
    }
    const dto: CreateNotificationDto = {
      title: 'Cập nhật trạng thái đơn hàng',
      message: `Đơn hàng #${payload.orderId} của bạn ${statusText.toLowerCase()}.`,
    };
    await this.notificationService.createNotification(payload.userId, dto);
    console.log(`[Event-Driven] Đã tạo Notification cho user ${payload.userId}`);

    // 2. Gửi Email thực tế qua NodeMailer
    if (payload.email) {
      try {
        console.log(`[Event-Driven] Đang gửi email cập nhật trạng thái đơn hàng #${payload.orderId} tới ${payload.email}...`);
        await this.emailService.sendOrderStatusUpdate(
          payload.email,
          payload.orderId,
          payload.status,
        );
      } catch (error) {
        console.error(`[Event-Driven] Lỗi khi gửi email:`, error);
      }
    }
  }
}
