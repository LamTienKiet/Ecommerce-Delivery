import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  // VNPay Sandbox Config
  private vnp_TmnCode = 'CGXZLS0Z';
  private vnp_HashSecret = 'XNBCJFAKAZQSGTARRLGCHVZWCIOIGSHN';
  private vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  private vnp_ReturnUrl = 'http://localhost:3000/payment/vnpay_return';

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
    vnp_Params['vnp_Amount'] = amount * 100; // VNPay requires multiplying by 100
    vnp_Params['vnp_ReturnUrl'] = this.vnp_ReturnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr || '127.0.0.1';
    vnp_Params['vnp_CreateDate'] = vnp_CreateDate;
    vnp_Params['vnp_ExpireDate'] = vnp_ExpireDate;

    vnp_Params = this.sortObject(vnp_Params);

    const signData = new URLSearchParams(vnp_Params).toString();
    const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    vnp_Params['vnp_SecureHash'] = signed;
    return this.vnp_Url + '?' + new URLSearchParams(vnp_Params).toString();
  }

  async vnpayReturn(vnp_Params: any) {
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const sortedParams = this.sortObject(vnp_Params);
    const signData = new URLSearchParams(sortedParams).toString();

    const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      const orderId = parseInt(vnp_Params['vnp_TxnRef'].split('-')[0], 10);
      const isSuccess = vnp_Params['vnp_ResponseCode'] === '00';

      // Update Payment status in DB
      const payment = await this.prisma.payment.findUnique({
        where: { orderId },
      });
      if (payment) {
        await this.prisma.payment.update({
          where: { orderId },
          data: { status: isSuccess ? 'SUCCESS' : 'FAILED' },
        });

        await this.prisma.paymentTransaction.create({
          data: {
            paymentId: payment.id,
            transactionCode:
              vnp_Params['vnp_TransactionNo'] || vnp_Params['vnp_TxnRef'],
            gatewayResponse: JSON.stringify(vnp_Params),
          },
        });

        if (isSuccess) {
          await this.prisma.order.update({
            where: { id: orderId },
            data: { currentStatus: 'CONFIRMED' },
          });
          await this.prisma.orderStatusHistory.create({
            data: { orderId, status: 'CONFIRMED' },
          });
        }
      }
      return { status: isSuccess ? 'success' : 'failed', orderId };
    }

    return { status: 'invalid_signature', orderId: null };
  }

  private sortObject(obj: any) {
    const sorted: any = {};
    const str: string[] = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }
}
