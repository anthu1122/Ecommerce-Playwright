# Test Cases

Cột **Auto** cho biết test case đã được tự động hóa ở class nào. Cột **Loại**: S = Smoke, R = Regression.

## UI (saucedemo.com)

| ID | Module | Mô tả | Các bước chính | Kết quả mong đợi | Ưu tiên | Loại | Auto |
|----|--------|-------|----------------|------------------|---------|------|------|
| TC_LOGIN_01 | Login | Đăng nhập thành công | Nhập `standard_user` / `secret_sauce` → Login | Vào trang Products | High | S, R | login.spec.ts |
| TC_LOGIN_02 | Login | Sai mật khẩu | Nhập user đúng, mật khẩu sai → Login | Báo lỗi "Username and password do not match any user in this service" | High | R | login.spec.ts |
| TC_LOGIN_03 | Login | Để trống username | Chỉ nhập mật khẩu → Login | Báo lỗi "Username is required" | Medium | R | login.spec.ts |
| TC_LOGIN_04 | Login | Để trống password | Chỉ nhập username → Login | Báo lỗi "Password is required" | Medium | R | login.spec.ts |
| TC_LOGIN_05 | Login | Tài khoản bị khóa | Đăng nhập `locked_out_user` | Báo lỗi "Sorry, this user has been locked out." | Medium | R | login.spec.ts |
| TC_LOGIN_06 | Login | Đăng xuất | Đăng nhập → mở menu → Logout | Quay về trang login | Medium | R | login.spec.ts |
| TC_PROD_01 | Products | Hiển thị danh sách | Đăng nhập | Hiển thị 6 sản phẩm | Medium | R | products.spec.ts |
| TC_PROD_02 | Products | Sắp xếp giá thấp → cao | Chọn "Price (low to high)" | Giá tăng dần | Medium | R | products.spec.ts |
| TC_PROD_03 | Products | Sắp xếp tên Z → A | Chọn "Name (Z to A)" | Tên giảm dần | Low | R | products.spec.ts |
| TC_CART_01 | Cart | Thêm 1 sản phẩm | Bấm Add to cart | Badge giỏ hàng = 1 | High | S, R | cart.spec.ts |
| TC_CART_02 | Cart | Thêm nhiều sản phẩm | Thêm 2 sản phẩm → mở giỏ | Giỏ có đúng 2 sản phẩm đã thêm, badge = 2 | High | R | cart.spec.ts |
| TC_CART_03 | Cart | Xóa sản phẩm | Thêm 1 sản phẩm → mở giỏ → Remove | Giỏ hàng trống | Medium | R | cart.spec.ts |
| TC_CHK_01 | Checkout | Đặt hàng thành công | Thêm sản phẩm → Checkout → nhập thông tin → Continue → Finish | Hiện "Thank you for your order!" | High | S, R | checkout.spec.ts |
| TC_CHK_02 | Checkout | Kiểm tra tổng tiền | Thêm 2 sản phẩm → đến bước Overview | Item total = 39.98; Total = Item total + Tax | High | R | checkout.spec.ts |
| TC_CHK_03 | Checkout | Thiếu First Name | Bỏ trống First Name → Continue | Báo lỗi "First Name is required" | Medium | R | checkout.spec.ts |
| TC_CHK_04 | Checkout | Thiếu Last Name | Bỏ trống Last Name → Continue | Báo lỗi "Last Name is required" | Medium | R | checkout.spec.ts |
| TC_CHK_05 | Checkout | Thiếu Postal Code | Bỏ trống Postal Code → Continue | Báo lỗi "Postal Code is required" | Medium | R | checkout.spec.ts |

## API (automationexercise.com/api)

> API này luôn trả HTTP 200; mã kết quả thật nằm trong trường `responseCode` của body.

| ID | Endpoint | Mô tả | Kết quả mong đợi | Ưu tiên | Loại | Auto |
|----|----------|-------|------------------|---------|------|------|
| TC_API_01 | GET /productsList | Lấy danh sách sản phẩm | responseCode 200, danh sách không rỗng, có name/price | High | S, R | products.api.spec.ts |
| TC_API_02 | POST /productsList | Method không hỗ trợ | responseCode 405, "This request method is not supported." | Low | R | products.api.spec.ts |
| TC_API_03 | GET /brandsList | Lấy danh sách brand | responseCode 200, danh sách không rỗng | Medium | R | products.api.spec.ts |
| TC_API_04 | POST /searchProduct | Tìm với `search_product=top` | responseCode 200, có kết quả | Medium | R | products.api.spec.ts |
| TC_API_05 | POST /searchProduct | Thiếu `search_product` | responseCode 400, báo thiếu tham số | Medium | R | products.api.spec.ts |
| TC_API_06 | POST /verifyLogin | User không tồn tại | responseCode 404, "User not found!" | High | R | user.api.spec.ts |
| TC_API_07 | POST /verifyLogin | Thiếu email | responseCode 400, báo thiếu tham số | Medium | R | user.api.spec.ts |
| TC_API_08 | DELETE /verifyLogin | Method không hỗ trợ | responseCode 405 | Low | R | user.api.spec.ts |
| TC_API_09 | createAccount → verifyLogin → deleteAccount | Vòng đời tài khoản | 201 "User created!" → 200 "User exists!" → 200 "Account deleted!" | High | S, R | user.api.spec.ts |

## Ý tưởng test case mở rộng

- Đăng nhập bằng `problem_user`, `error_user`, `visual_user`, `performance_glitch_user` (các user này cố tình có lỗi để luyện viết bug report)
- Giỏ hàng giữ nguyên sau khi reload trang
- Nút Cancel ở các bước checkout
- Tìm kiếm sản phẩm không tồn tại (API)
