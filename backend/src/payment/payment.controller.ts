import { Controller, Get, Query, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import type { Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('vnpay_return')
  async vnpayReturn(@Query() query: any, @Res() res: Response) {
    const result = await this.paymentService.vnpayReturn(query);
    // Redirect về Frontend hiển thị kết quả
    return res.redirect(
      `http://localhost:5173/payment-return?status=${result.status}&orderId=${result.orderId || ''}`,
    );
  }
}
