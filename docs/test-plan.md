# Test Plan: E-commerce Automation

## 1. Mục tiêu

Xác nhận các luồng chính của một website bán hàng (đăng nhập, xem/sắp xếp sản phẩm, giỏ hàng, thanh toán) và các API liên quan hoạt động đúng, đồng thời xây dựng bộ regression tự động để chạy lại sau mỗi thay đổi.

## 2. Phạm vi

**Trong phạm vi**
- UI: Login/Logout, danh sách và sắp xếp sản phẩm, giỏ hàng, checkout (3 bước)
- API: products, brands, search, verifyLogin, createAccount, deleteAccount

**Ngoài phạm vi**
- Performance/load test, security test
- Thanh toán thật (website demo không có cổng thanh toán)
- Test trên thiết bị di động thật

## 3. Đối tượng test

| Thành phần | URL |
|------------|-----|
| Web UI | https://www.saucedemo.com |
| API | https://automationexercise.com/api |

Đây là các website demo công khai dành cho việc luyện tập test.

## 4. Môi trường & công cụ

| Hạng mục | Chi tiết |
|----------|----------|
| Ngôn ngữ | TypeScript (Node.js 20) |
| UI automation | Playwright Test |
| API automation | Playwright APIRequestContext |
| Build | npm |
| CI | GitHub Actions (Ubuntu, Chrome headless) |
| Trình duyệt | Chromium, Firefox, WebKit |

## 5. Chiến lược test

- **Smoke** (tag `@smoke`): các luồng quan trọng nhất, chạy trước. Nếu smoke fail thì dừng, không chạy regression.
- **Regression** (tag `@regression`): toàn bộ test case, gồm cả negative test và validate dữ liệu.
- Mỗi test độc lập, tự đăng nhập và tự tạo dữ liệu; account tạo qua API được xóa ngay sau khi test xong.
- Dùng Page Object Model để tách locator khỏi logic test.

## 6. Tiêu chí

- **Pass:** toàn bộ test smoke pass; regression pass ≥ 95%, không còn bug mức Critical/High.
- **Fail:** có test smoke fail, hoặc còn bug Critical/High chưa xử lý.

## 7. Rủi ro

| Rủi ro | Giải pháp |
|--------|-----------|
| Website demo thay đổi giao diện hoặc ngừng hoạt động | Tập trung locator trong Page Object để sửa 1 chỗ; chạy lại định kỳ |
| Mạng chậm gây flaky test | Dùng auto-wait và web-first assertion của Playwright, không dùng sleep cứng |
| API demo trả HTTP 200 cho mọi trường hợp | Assert theo trường `responseCode` trong body |

## 8. Sản phẩm bàn giao

- Source code framework trên GitHub
- Test case ([test-cases.md](test-cases.md))
- Report HTML + trace, video, ảnh chụp khi fail (artifact của GitHub Actions)
- Bug report ([bug-report-template.md](bug-report-template.md))
