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
    const { productId, quantity, note } = createCartDto;

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
          note: note !== undefined ? note : undefined,
        },
        create: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
          note: note,
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

  // *Many + cart.userId so a user can only touch items in their own cart
  async removeCartItem(userId: number, cartItemId: number) {
    const { count } = await this.prismaService.cartItem.deleteMany({
      where: { id: cartItemId, cart: { userId } },
    });
    if (count === 0) {
      throw new NotFoundException(`Cart item ${cartItemId} not found`);
    }
    return { count };
  }

  async updateCartItemQuantity(
    userId: number,
    cartItemId: number,
    quantity: number,
  ) {
    if (quantity <= 0) {
      return this.removeCartItem(userId, cartItemId);
    }
    const { count } = await this.prismaService.cartItem.updateMany({
      where: { id: cartItemId, cart: { userId } },
      data: { quantity },
    });
    if (count === 0) {
      throw new NotFoundException(`Cart item ${cartItemId} not found`);
    }
    return { count };
  }

  async findCartByUserId(userId: number) {
    const cart = await this.prismaService.cart.findUnique({
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
