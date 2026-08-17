import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}
  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    let totalAmount = 0;
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

      if (!cart) {
        throw new BadRequestException('Cart Not Found');
      }

      if (cart?.cartItems.length === 0) {
        throw new BadRequestException('Cart is empty');
      }

      for (const items of cart.cartItems) {
        if (!items.product.isAvailable) {
          throw new BadRequestException('This products is not available');
        }
        totalAmount += items.product.price * items.quantity;
      }

      const order = await this.prismaService.order.create({
        data: {
          userId,
          totalAmount,
          shippingAddress: createOrderDto.shippingAddress,
          currentStatus: 'PENDING',
        },
      });

      return order;
    });
  }
}
