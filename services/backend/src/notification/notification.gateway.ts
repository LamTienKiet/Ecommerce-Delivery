import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger('NotificationGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Lắng nghe Event từ OrderService
  @OnEvent('order.status_updated')
  handleOrderStatusUpdate(payload: { userId: number; orderId: number; status: string }) {
    this.logger.log(`Broadcasting status update for order #${payload.orderId} to user #${payload.userId}`);
    // Bắn một tín hiệu cụ thể tới userId này. Tên event ví dụ: orderStatusUpdate_1
    this.server.emit(`orderStatusUpdate_${payload.userId}`, payload);
  }
}
