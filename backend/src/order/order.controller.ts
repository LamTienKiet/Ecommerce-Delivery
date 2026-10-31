import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  Ip,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { PaymentService } from '../payment/payment.service';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService,
  ) {}

  @Post()
  async createOrder(
    @Request() req,
    @Ip() ip,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const order = await this.orderService.createOrder(
      req.user.sub,
      createOrderDto,
    );

    if (
      createOrderDto.paymentMethod === 'bank' ||
      createOrderDto.paymentMethod === 'vnpay'
    ) {
      const vnpayUrl = this.paymentService.createVnpayUrl(order, ip);
      return { message: 'Order created successfully', order, vnpayUrl };
    }

    return { message: 'Order created successfully', order };
  }

  @Get()
  getOrdersByUser(@Request() req) {
    return this.orderService.getOrdersByUser(req.user.sub);
  }

  @Get('all')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Request() req, @Param('id') id: string) {
    return this.orderService.getOrderById(req.user.sub, +id);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  updateOrderStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.orderService.updateOrderStatus(+id, status);
  }
}
