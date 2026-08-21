import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    return await this.prismaService.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { userId },
        include: {
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

      await tx.orderStatusHistory.update({
        where: { id: orderId },
        data: { orderId, status },
      });

      return updateOrder;
    });
  }
}
