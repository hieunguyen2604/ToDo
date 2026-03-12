# Hướng dẫn chi tiết: Quy trình CI/CD trong dự án ToDo

Dưới đây là giải thích từng bước (step-by-step) về những gì xảy ra từ lúc bạn gõ phím cho đến khi ứng dụng chạy trên Docker.

## Bước 1: Phát triển (Developer Work)
Bạn thực hiện thay đổi code (ví dụ: đổi giao diện trong React hoặc thêm API trong .NET). Sau đó bạn chạy lệnh:
`git push origin main`

---

## Bước 2: Kích hoạt (The Trigger)
GitHub nhận được code mới. Nó nhìn vào file `.github/workflows/main.yml`. 
- **Điều kiện:** Có push vào branch `main`.
- **Hành động:** GitHub thuê một máy ảo (Runner) chạy Ubuntu để bắt đầu làm việc.

---

## Bước 3: Kiểm tra và Build (CI - Continuous Integration)
Đây là giai đoạn quan trọng nhất của CI để đảm bảo code không có lỗi:
1.  **Cài đặt môi trường:** Lấy .NET 9 SDK và Node.js 20 vào máy ảo.
2.  **Build thử:** 
    - Chạy `dotnet build` để kiểm tra lỗi cú pháp C#.
    - Chạy `npm run build` để kiểm tra lỗi React/Vite.
3.  **Kết quả:** Nếu bước này lỗi (đỏ), quy trình dừng lại ngay lập tức để bạn sửa. Nếu xong, code của bạn đã "đủ tiêu chuẩn".

---

## Bước 4: Đóng gói Docker (Containerization)
Sau khi build xong, máy ảo sẽ thực hiện "đóng gói":
1.  Dựa vào `Dockerfile.backend` và `Dockerfile.frontend` để tạo ra **Docker Images**.
2.  Mọi thứ (Code, Runtime, Library) được nén chặt vào một Image duy nhất. Điều này đảm bảo: "Chạy được trên máy GitHub là chắc chắn chạy được trên máy bạn".

---

## Bước 5: Lưu kho (Push to Registry)
Máy ảo đẩy các Image vừa tạo lên **GitHub Container Registry (GHCR)**:
- API Image -> `ghcr.io/hieunguyen2604/todo-api:latest`
- Frontend Image -> `ghcr.io/hieunguyen2604/todo-frontend:latest`

---

## Bước 6: Triển khai (CD - Continuous Deployment - Local)
Vì bạn đang chạy ở máy Local, bước này diễn ra khi bạn gõ:
`docker-compose pull && docker-compose up -d`

1.  **Pull:** Máy bạn hỏi GitHub "Có bản mới không?". GitHub gửi bản đã build ở Bước 5 về.
2.  **Up:** Docker tắt container cũ, bật container mới bằng Image vừa tải.
3.  **Nginx:** Container Nginx bắt đầu hứng cổng 80, chuyển yêu cầu người dùng vào Frontend hoặc API tùy theo URL.

---

## Tổng kết ý nghĩa
- **CI giúp bạn:** Không bao giờ push code "lỗi" mà không biết.
- **CD giúp bạn:** Triển khai cực nhanh. Bạn không cần cài .NET hay Node.js trên server/máy khác, chỉ cần cài Docker là chạy được ngay.
- **Docker giúp bạn:** Loại bỏ câu nói "Nhưng trên máy tôi nó chạy bình thường mà!". Mọi môi trường đều giống hệt nhau.
