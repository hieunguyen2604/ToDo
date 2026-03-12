# Hướng dẫn cài đặt và cấu hình ngrok trên macOS

Ngrok sẽ tạo ra một đường ống (tunnel) giúp cả thế giới (và cả GitHub) có thể truy cập vào cổng Docker trên máy bạn.

## 1. Cài đặt ngrok

Cách nhanh nhất trên Mac là dùng **Homebrew**:
```bash
brew install ngrok/ngrok/ngrok
```
*Nếu chưa có Homebrew, bạn tải file tại [ngrok.com](https://ngrok.com/download), giải nén và kéo vào thư mục Applications.*

---

## 2. Đăng ký và Xác thực (Authentication)

1.  Truy cập [ngrok.com](https://ngrok.com/), đăng ký một tài khoản miễn phí.
2.  Sau khi đăng nhập, tìm mục **Your Authtoken**.
3.  Copy mã token và chạy lệnh sau trong Terminal máy bạn:
    ```bash
    ngrok config add-authtoken <YOUR_AUTHTOKEN>
    ```

---

## 3. Cách sử dụng

### Trường hợp A: Để xem giao diện Web từ bên ngoài
Nếu Docker của bạn đang chạy Nginx ở cổng 80:
```bash
ngrok http 80
```
- Ngrok sẽ cho bạn một URL: `https://xxxx-xxxx.ngrok-free.app`
- Bạn có thể dùng điện thoại truy cập vào link này để thấy ứng dụng ToDo của mình.

### Trường hợp B: Để GitHub SSH vào máy bạn (Học CD)
Để GitHub Actions có thể điều khiển Docker Local, bạn cần mở cổng SSH (mặc định là 22):
```bash
ngrok tcp 22
```
- Ngrok sẽ cho bạn địa chỉ: `tcp://0.tcp.ap.ngrok.io:12345`
- **Host:** `0.tcp.ap.ngrok.io`
- **Port:** `12345`

---

## 4. Lưu ý quan trọng
- **Bản miễn phí:** Mỗi lần bạn tắt và bật lại ngrok bằng lệnh trên, địa chỉ URL hoặc Port sẽ bị thay đổi.
- **Để chạy ngrok cùng Docker:** Bạn nên mở 2 cửa sổ Terminal: 1 cái chạy `docker-compose up` và 1 cái chạy `ngrok`.

---

## 5. Thử nghiệm ngay
Sau khi chạy `ngrok http 80`, hãy thử copy cái link `.app` mà ngrok cấp cho bạn, gửi cho một người bạn hoặc mở trên điện thoại (đang dùng 4G) để xem thành quả nhé!
