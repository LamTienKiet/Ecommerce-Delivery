import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendOrderConfirmation(
    email: string,
    orderId: number,
    totalAmount: number,
  ) {
    const formattedAmount = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(totalAmount);

    const htmlTemplate = `
      <div style="font-family: 'Times New Roman', serif; background-color: #121b16; color: #f1e9d8; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #b7913c; margin: 0; font-size: 28px; letter-spacing: 2px;">LA TiuKy</h1>
          <p style="color: #a9b4a4; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Culinary Experience</p>
        </div>
        
        <div style="background-color: #182720; padding: 30px; border: 1px solid rgba(241, 233, 216, 0.28); border-radius: 8px;">
          <h2 style="color: #f1e9d8; margin-top: 0; font-size: 22px; border-bottom: 1px solid rgba(241, 233, 216, 0.28); padding-bottom: 15px;">Xác nhận đơn hàng #${orderId}</h2>
          
          <p style="color: #a9b4a4; line-height: 1.6; font-size: 16px;">
            Xin chào quý khách,<br><br>
            Cảm ơn quý khách đã tin tưởng và đặt món tại <strong>La TiuKy Restaurant</strong>. Đơn hàng của quý khách đã được tiếp nhận và đang trong quá trình xử lý.
          </p>
          
          <div style="background-color: #121b16; padding: 15px; border-left: 3px solid #b7913c; margin: 25px 0;">
            <p style="margin: 0; color: #f1e9d8; font-size: 16px;"><strong>Mã đơn hàng:</strong> #${orderId}</p>
            <p style="margin: 5px 0 0 0; color: #f1e9d8; font-size: 16px;"><strong>Tổng thanh toán:</strong> <span style="color: #b7913c; font-weight: bold; font-size: 18px;">${formattedAmount}</span></p>
          </div>
          
          <p style="color: #a9b4a4; line-height: 1.6; font-size: 14px;">
            Quý khách có thể theo dõi trạng thái đơn hàng trực tiếp trên website của chúng tôi. Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ hotline 1900 xxxx.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:5173/order/${orderId}" style="background-color: #b7913c; color: #121b16; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase; font-size: 14px; letter-spacing: 1px; display: inline-block;">Theo Dõi Đơn Hàng</a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; border-top: 1px solid rgba(241, 233, 216, 0.1); padding-top: 20px;">
          <p style="color: #6c7a6f; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} La TiuKy Restaurant. Mọi quyền được bảo lưu.</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"La TiuKy Restaurant" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `[La TiuKy] Xác nhận đơn hàng #${orderId}`,
      html: htmlTemplate,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(
        `Email xác nhận đơn hàng #${orderId} đã gửi tới ${email} thành công! ID: ${info.messageId}`,
      );
      return info;
    } catch (error) {
      this.logger.error(
        `Lỗi khi gửi email xác nhận đơn hàng #${orderId}:`,
        error,
      );
      throw error;
    }
  }

  async sendOrderStatusUpdate(email: string, orderId: number, status: string) {
    let statusText = status;
    switch (status) {
      case 'COMPLETED':
        statusText = 'Đã giao thành công';
        break;
      case 'DELIVERING':
        statusText = 'Đang giao hàng';
        break;
      case 'CANCELLED':
        statusText = 'Đã bị hủy';
        break;
      case 'PREPARING':
        statusText = 'Đang chuẩn bị';
        break;
    }

    const htmlTemplate = `
      <div style="font-family: 'Times New Roman', serif; background-color: #121b16; color: #f1e9d8; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #b7913c; margin: 0; font-size: 28px; letter-spacing: 2px;">LA TiuKy</h1>
          <p style="color: #a9b4a4; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Culinary Experience</p>
        </div>
        
        <div style="background-color: #182720; padding: 30px; border: 1px solid rgba(241, 233, 216, 0.28); border-radius: 8px;">
          <h2 style="color: #f1e9d8; margin-top: 0; font-size: 22px; border-bottom: 1px solid rgba(241, 233, 216, 0.28); padding-bottom: 15px;">Cập nhật đơn hàng #${orderId}</h2>
          
          <p style="color: #a9b4a4; line-height: 1.6; font-size: 16px;">
            Xin chào quý khách,<br><br>
            Đơn hàng <strong>#${orderId}</strong> của quý khách vừa được cập nhật trạng thái mới.
          </p>
          
          <div style="background-color: #121b16; padding: 15px; border-left: 3px solid #b7913c; margin: 25px 0;">
            <p style="margin: 0; color: #f1e9d8; font-size: 16px;"><strong>Trạng thái hiện tại:</strong> <span style="color: #b7913c; font-weight: bold; font-size: 18px;">${statusText}</span></p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:5173/order/${orderId}" style="background-color: #b7913c; color: #121b16; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase; font-size: 14px; letter-spacing: 1px; display: inline-block;">Xem Chi Tiết</a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; border-top: 1px solid rgba(241, 233, 216, 0.1); padding-top: 20px;">
          <p style="color: #6c7a6f; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} La TiuKy Restaurant. Mọi quyền được bảo lưu.</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"La TiuKy Restaurant" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `[La TiuKy] Đơn hàng #${orderId} - ${statusText}`,
      html: htmlTemplate,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(
        `Email cập nhật trạng thái đơn hàng #${orderId} đã gửi tới ${email} thành công! ID: ${info.messageId}`,
      );
      return info;
    } catch (error) {
      this.logger.error(
        `Lỗi khi gửi email trạng thái đơn hàng #${orderId}:`,
        error,
      );
      throw error;
    }
  }
}
