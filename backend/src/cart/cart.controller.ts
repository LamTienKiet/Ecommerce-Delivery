import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Request() req, @Body() createCartDto: CreateCartDto) {
    const userId = req.user.sub;
    return this.cartService.addToCart(userId, createCartDto);
  }
  @Get()
  findOne(@Request() req) {
    return this.cartService.findCartByUserId(req.user.sub);
  }

  @Patch('item/:cartItemId')
  updateQuantity(
    @Param('cartItemId') cartItemId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateCartItemQuantity(+cartItemId, quantity);
  }
  @Delete('item/:cartItemId')
  removeItem(@Param('cartItemId') cartItemId: string) {
    return this.cartService.removeCartItem(+cartItemId);
  }
  @Delete('clear')
  clear(@Request() req) {
    return this.cartService.clearCart(req.user.sub);
  }
}
