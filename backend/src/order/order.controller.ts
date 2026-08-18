import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(req.user.sub, createOrderDto);
  }

  @Get()
  getOrdersByUser(@Request() req) {
    return this.orderService.getOrdersByUser(req.user.sub);
  }

  @Get(':id')
  getOrderById(@Request() req, @Param('id') id: string) {
    return this.orderService.getOrderById(req.user.sub, +id);
  }

  @Patch(':id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    // Note: In a real app, this should probably be restricted to admin/staff roles
    return this.orderService.updateOrderStatus(+id, status);
  }
}
