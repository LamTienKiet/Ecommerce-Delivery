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
