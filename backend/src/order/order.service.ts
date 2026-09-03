import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from './events/order-created.event';

@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    return await this.prismaService.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { userId },
        include: {
          user: {
            include: { account: true }
          },
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!cart || cart.cartItems.length === 0) {
        throw new BadRequestException('Cart is empty or not found');
      }

      let totalAmount = 0;
      const orderItemsData: any[] = [];

      for (const item of cart.cartItems) {
        if (!item.product.isAvailable) {
          throw new BadRequestException(
            `Product ${item.product.name} is not available`,
          );
        }
        const itemTotal = Number(item.product.price) * item.quantity;
        totalAmount += itemTotal;

        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
          note: item.note,
        });
      }

      const order = await tx.order.create({
        data: {
          userId,
          fullName: createOrderDto.fullName,
          phone: createOrderDto.phone,
          note: createOrderDto.note,
          totalAmount,
          shippingAddress: createOrderDto.shippingAddress,
          currentStatus: 'PENDING',
          orderItems: {
            create: orderItemsData,
          },
          histories: {
            create: {
              status: 'PENDING',
            },
          },
          payment: {
            create: {
              paymentMethod: createOrderDto.paymentMethod,
              amount: totalAmount,
              status: 'PENDING',
            }
          }
        },
        include: {
          orderItems: true,
          histories: true,
        },
      });

      // 4. Clear Cart Items
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      // 5. Emit Event
      const email = cart.user?.account?.email;
      this.eventEmitter.emit(
        'order.created',
        new OrderCreatedEvent(order.id, userId, Number(totalAmount), orderItemsData, email),
      );

      return order;
    });
  }

  async getOrdersByUser(userId: number) {
    return this.prismaService.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllOrders() {
    return this.prismaService.order.findMany({
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOrderById(userId: number, orderId: number) {
    const order = await this.prismaService.order.findUnique({
      where: { id: orderId, userId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        histories: true,
        payment: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrderStatus(orderId: number, status: string) {
    return await this.prismaService.$transaction(async (tx) => {
      const order = await this.prismaService.order.findUnique({
        where: { id: orderId },
        include: { user: { include: { account: true } } },
      });

      if (!order) {
        throw new BadRequestException('Order not found');
      }

      const updateOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          currentStatus: status,
        },
      });

      await tx.orderStatusHistory.create({
        data: { orderId, status },
      });

      const extractedEmail = order.user?.account?.email;
      console.log(`[OrderService] Chuẩn bị bắn event order.status_updated cho đơn #${orderId}. Email khách hàng:`, extractedEmail);

      // Bắn event để Gateway (WebSocket) gửi notify tới màn hình của đúng User đó
      this.eventEmitter.emit('order.status_updated', {
        userId: updateOrder.userId,
        orderId: updateOrder.id,
        status: updateOrder.currentStatus,
        email: extractedEmail,
      });

      return updateOrder;
    });
  }
}
