# Event-Driven Ecommerce

Dự án này bao gồm hai phần chính: Frontend và Backend. Cấu trúc dự án được thiết kế gọn gàng và dễ dàng triển khai.

## Cấu trúc thư mục
- `/frontend`: Chứa mã nguồn ứng dụng web cho người dùng.
- `/backend`: Chứa mã nguồn máy chủ API.
- `/deploy`: Chứa các cấu hình và script dùng cho việc triển khai dự án (Docker, CI/CD,...).
- `/.github`: Chứa cấu hình GitHub Actions.

## Bắt đầu

Bạn có thể cài đặt tất cả các package từ thư mục gốc bằng lệnh:
```bash
npm install
```

Để chạy môi trường phát triển:

- Frontend: `npm run dev:frontend`
- Backend: `npm run dev:backend`

## Chạy bằng Docker

Sao chép `.env.example` thành `backend/.env` và `.env`, điền các giá trị rồi chạy:

```bash
docker compose up --build
```

Backend tự chạy migration và seed khi khởi động. Tài khoản `admin` chỉ được tạo khi có `ADMIN_PASSWORD`.

## Thanh toán

> Đây là dự án portfolio. VNPay chạy ở môi trường **sandbox** để minh họa luồng thanh toán, **không nhận tiền thật**.
