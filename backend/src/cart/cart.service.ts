import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}

  async addToCart(createCartDto: CreateCartDto) {
    const { userId, productId, quantity } = createCartDto;

    //transaction
    return this.prismaService.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!product) {
        throw new BadRequestException(
          'Product with id ${productId} is not found',
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
    });
  }
}
