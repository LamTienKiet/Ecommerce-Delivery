import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL?.split(',') ?? [
      'http://localhost:5173',
      'http://localhost:5174',
    ],
  },
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger = new Logger('NotificationGateway');

  constructor(private jwtService: JwtService) {}

  // Only authenticated sockets connect, and each joins a private room for its user
  async handleConnection(client: Socket) {
    try {
      const payload = await this.jwtService.verifyAsync(
        client.handshake.auth?.token,
        { secret: process.env.JWT_SECRET },
      );
      await client.join(`user_${payload.sub}`);
      this.logger.log(`Client connected: ${client.id} (user #${payload.sub})`);
    } catch {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Lắng nghe Event từ OrderService
  @OnEvent('order.status_updated')
  handleOrderStatusUpdate(payload: {
    userId: number;
    orderId: number;
    status: string;
    email?: string;
  }) {
    this.logger.log(
      `Sending status update for order #${payload.orderId} to user #${payload.userId}`,
    );
    const { email, ...data } = payload;
    // Chỉ gửi tới room của đúng user đó; event name giữ nguyên để frontend không phải đổi
    this.server
      .to(`user_${payload.userId}`)
      .emit(`orderStatusUpdate_${payload.userId}`, data);
  }
}
