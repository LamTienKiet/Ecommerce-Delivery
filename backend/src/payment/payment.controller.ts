import { Controller, Get, Query, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import type { Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Browser redirect back from VNPay
  @Get('vnpay_return')
  async vnpayReturn(@Query() query: any, @Res() res: Response) {
    const result = await this.paymentService.processVnpayResult(query);
    const status =
      result.RspCode === '97'
        ? 'invalid_signature'
        : (result.RspCode === '00' || result.RspCode === '02') &&
            result.isSuccess
          ? 'success'
          : 'failed';
    // Redirect về Frontend hiển thị kết quả
    const frontendUrl = (
      process.env.FRONTEND_URL ?? 'http://localhost:5173'
    ).split(',')[0];
    return res.redirect(
      `${frontendUrl}/payment-return?status=${status}&orderId=${result.orderId || ''}`,
    );
  }

  // Server-to-server callback from VNPay; set this URL as the IPN URL in the VNPay merchant portal
  @Get('vnpay_ipn')
  async vnpayIpn(@Query() query: any) {
    const { RspCode, Message } =
      await this.paymentService.processVnpayResult(query);
    return { RspCode, Message };
  }
}
