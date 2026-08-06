import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.addToCart(createCartDto);
  }
  @Get('user/:userId')
  findOne(@Param('userId') userId: string) {
    return this.cartService.findCartByUserId(+userId);
  }
  @Delete('item/:cartItemId')
  removeItem(@Param('cartItemId') cartItemId: string) {
    return this.cartService.removeCartItem(+cartItemId);
  }
  @Delete('clear/:userId')
  clear(@Param('userId') userId: string) {
    return this.cartService.clearCart(+userId);
  }
}
