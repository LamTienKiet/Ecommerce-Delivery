import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}

  createCart(createCartDto: CreateCartDto) {
    return this.prismaService.cart.create({
      data: {
        userId: createCartDto.userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }
  // getCartByUserId()
  // getCartById()
  // clearCart()
  // deleteCart()

  findUserCart(userId: number) {
    return this.prismaService.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
  }
}
