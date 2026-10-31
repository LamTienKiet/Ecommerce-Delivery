import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  // VNPay Sandbox Config
  private vnp_TmnCode = process.env.VNPAY_TMN_CODE!;
  private vnp_HashSecret = process.env.VNPAY_HASH_SECRET!;
  private vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  private vnp_ReturnUrl =
    process.env.VNPAY_RETURN_URL ??
    'http://localhost:3000/payment/vnpay_return';

  createVnpayUrl(order: any, ipAddr: string) {
    const date = new Date();
    const pad = (n: number) => (n < 10 ? '0' + n : n);
    const vnp_CreateDate = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;

    date.setMinutes(date.getMinutes() + 15);
    const vnp_ExpireDate = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;

    const orderId = order.id;
    const amount = Number(order.totalAmount);

    let vnp_Params: any = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = this.vnp_TmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = orderId + '-' + new Date().getTime(); // Unique transaction per attempt
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan don hang ' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = Math.round(amount * 100); // VNPay requires multiplying by 100 and must be integer
    vnp_Params['vnp_ReturnUrl'] = this.vnp_ReturnUrl;
    vnp_Params['vnp_IpAddr'] =
      ipAddr && ipAddr !== '::1' ? ipAddr : '127.0.0.1';
    vnp_Params['vnp_CreateDate'] = vnp_CreateDate;
    vnp_Params['vnp_ExpireDate'] = vnp_ExpireDate;

    vnp_Params = this.sortObject(vnp_Params);
    vnp_Params['vnp_SecureHash'] = this.sign(vnp_Params);
    return (
      this.vnp_Url +
      '?' +
      Object.keys(vnp_Params)
        .map((key) => `${key}=${vnp_Params[key]}`)
        .join('&')
    );
  }

  // Used by both the browser return URL and VNPay's server-to-server IPN; safe to run twice.
  // Returns VNPay IPN response codes: 00 ok, 01 order not found, 02 already confirmed, 04 wrong amount, 97 bad signature.
  async processVnpayResult(query: any) {
    const { vnp_SecureHash, vnp_SecureHashType, ...params } = query;
    if (
      !vnp_SecureHash ||
      this.sign(this.sortObject(params)) !== vnp_SecureHash
    ) {
      return {
        RspCode: '97',
        Message: 'Invalid signature',
        orderId: null,
        isSuccess: false,
      };
    }

    const orderId = parseInt(String(params.vnp_TxnRef).split('-')[0], 10);
    const isSuccess = params.vnp_ResponseCode === '00';

    return this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.findUnique({ where: { orderId } });
      if (!payment) {
        return {
          RspCode: '01',
          Message: 'Order not found',
          orderId,
          isSuccess: false,
        };
      }
      if (
        Math.round(Number(payment.amount) * 100) !== Number(params.vnp_Amount)
      ) {
        return {
          RspCode: '04',
          Message: 'Invalid amount',
          orderId,
          isSuccess: false,
        };
      }

      // Conditional update: a paid order is never downgraded, and only one callback wins the race.
      const { count } = await tx.payment.updateMany({
        where: { id: payment.id, status: { not: 'SUCCESS' } },
        data: { status: isSuccess ? 'SUCCESS' : 'FAILED' },
      });
      if (count === 0) {
        return {
          RspCode: '02',
          Message: 'Order already confirmed',
          orderId,
          isSuccess: true,
        };
      }

      // paymentId is unique, so a retry after a failed attempt overwrites the old row.
      const transaction = {
        transactionCode: params.vnp_TransactionNo || params.vnp_TxnRef,
        gatewayResponse: JSON.stringify(params),
      };
      await tx.paymentTransaction.upsert({
        where: { paymentId: payment.id },
        create: { paymentId: payment.id, ...transaction },
        update: transaction,
      });

      if (isSuccess) {
        const updated = await tx.order.updateMany({
          where: { id: orderId, currentStatus: 'PENDING' },
          data: { currentStatus: 'CONFIRMED' },
        });
        if (updated.count > 0) {
          await tx.orderStatusHistory.create({
            data: { orderId, status: 'CONFIRMED' },
          });
        }
      }
      return { RspCode: '00', Message: 'Confirm Success', orderId, isSuccess };
    });
  }

  private sign(sortedParams: Record<string, string>) {
    const signData = Object.keys(sortedParams)
      .map((key) => `${key}=${sortedParams[key]}`)
      .join('&');
    return crypto
      .createHmac('sha512', this.vnp_HashSecret)
      .update(Buffer.from(signData, 'utf-8'))
      .digest('hex');
  }

  private sortObject(obj: any) {
    const sorted: any = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
      sorted[key] = encodeURIComponent(String(obj[key])).replace(/%20/g, '+');
    }
    return sorted;
  }
}
