# Walkthrough: ToDo Project with Automated CI/CD

Chúc mừng! Bạn đã xây dựng thành công một hệ thống CI/CD hoàn chỉnh từ Local lên GitHub và ngược lại.

## Kết quả đạt được

1.  **Backend:** ASP.NET Core (.NET 9) với Entity Framework Core và PostgreSQL.
2.  **Frontend:** React (Vite) với giao diện hiện đại, responsive.
3.  **Infrastructure:** 
    - Docker & Docker Compose cho toàn bộ hệ thống.
    - Nginx làm Reverse Proxy.
4.  **CI/CD Pipeline:**
    - **CI (Continuous Integration):** Tự động Build và Push Docker Images lên GitHub Container Registry (GHCR).
    - **CD (Continuous Deployment):** Tự động truy cập vào máy Local qua **ngrok SSH tunnel** để cập nhật ứng dụng ngay lập tức khi có code mới.

## Cách xem kết quả (Domain UI)

Vì bạn đang dùng ngrok miễn phí, bạn không thể chạy cùng lúc SSH (cổng 22) và Web (cổng 80) trên một tunnel. 

**Cách xem UI hiện tại:**
1.  Tắt ngrok SSH (Ctrl+C).
2.  Chạy lệnh: `ngrok http 80`.
3.  Truy cập vào link `https://xxxx.ngrok-free.app` hiện ra. Bạn sẽ thấy tiêu đề mới: **"Task Management (CI/CD Enabled)"**.

---

## Những bài học DevOps quan trọng từ dự án:

1.  **Environment Agnostic:** Ứng dụng chạy trong Docker nên nó không quan tâm máy của bạn là Mac hay Windows.
2.  **Secret Management:** Cách sử dụng GitHub Secrets để bảo vệ thông tin nhạy cảm (IP, SSH Key).
3.  **Automation:** Tiết kiệm thời gian bằng cách để máy móc tự Build và Deploy.
4.  **Network Tunneling:** Cách dùng ngrok để biến một máy tính cá nhân thành một phần của hạ tầng đám mây.

Dự án này là nền tảng cực tốt để bạn bắt đầu làm việc với các hệ thống Cloud lớn hơn như AWS, Google Cloud hoặc Azure.
