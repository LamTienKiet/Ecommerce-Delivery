import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}

  async addToCart(userId: number, createCartDto: CreateCartDto) {
    const { productId, quantity } = createCartDto;

    //transaction
    return this.prismaService.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!product) {
        throw new BadRequestException(
          `Product with id ${productId} is not found`,
        );
      }

      const cart = await tx.cart.upsert({
        where: { userId },
        update: {},
        create: { userId },
      });

      // 3. Thêm mới hoặc cộng dồn số lượng sản phẩm trong giỏ
      await tx.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: productId,
          },
        },
        update: {
          quantity: {
            increment: quantity,
          },
        },
        create: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        },
      });

      return await tx.cart.findUnique({
        where: {
          id: cart.id,
        },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      });
    });
  }

  async removeCartItem(cartItemId: number) {
    return this.prismaService.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
  }

  async findCartByUserId(userId: number) {
    const cart = await this.prismaService.cart.findUnique({
      where: { userId: userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException(`Cart of User with Id ${userId} not found`);
    }

    return cart;
  }

  async clearCart(userId: number) {
    const cartFound = await this.prismaService.cart.findUnique({
      where: { userId },
    });

    if (!cartFound) return;

    return this.prismaService.cartItem.deleteMany({
      where: { cartId: cartFound.id },
    });
  }
}
