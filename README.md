# E-commerce Automation Testing Framework (Playwright + TypeScript)

![CI](https://github.com/<your-username>/ecommerce-playwright-ts/actions/workflows/playwright.yml/badge.svg)

Bộ test tự động cho website thương mại điện tử, gồm **UI test** và **API test** bằng Playwright, tổ chức theo **Page Object Model + fixtures**, chạy tự động bằng **GitHub Actions**.

| Loại test | Ứng dụng được test | Công cụ |
|-----------|--------------------|---------|
| UI | [saucedemo.com](https://www.saucedemo.com) (web bán hàng demo) | Playwright Test (Chromium, Firefox, WebKit) |
| API | [automationexercise.com/api](https://automationexercise.com/api_list) | Playwright `request` (APIRequestContext) |

## Phạm vi test

- **Login:** đăng nhập đúng/sai, để trống field, tài khoản bị khóa, đăng xuất (data-driven)
- **Sản phẩm:** số lượng sản phẩm, sắp xếp theo giá và tên
- **Giỏ hàng:** thêm, xóa sản phẩm, kiểm tra badge
- **Checkout:** đặt hàng thành công, kiểm tra tổng tiền = tiền hàng + thuế, validate form
- **API:** danh sách sản phẩm/brand, tìm kiếm, verify login, vòng đời tài khoản (tạo → xác thực → xóa), các case lỗi 400/404/405

Chi tiết xem [`docs/test-plan.md`](docs/test-plan.md) và [`docs/test-cases.md`](docs/test-cases.md).

## Cấu trúc project

```
ecommerce-playwright-ts/
├── pages/                  # Page Object: Login, Products, Cart, Checkout
├── fixtures/test.ts        # fixture: tự tạo page object, có sẵn "loggedIn"
├── tests/
│   ├── ui/                 # login / products / cart / checkout .spec.ts
│   └── api/                # products.api.spec.ts, user.api.spec.ts
├── test-data/users.json    # dữ liệu cho data-driven test
├── utils/helpers.ts
├── playwright.config.ts    # projects: chromium, firefox, webkit, api
├── docs/                   # test plan, test cases, mẫu bug report
└── .github/workflows/playwright.yml
```

## Yêu cầu

- Node.js 20+

## Cài đặt và chạy trên VS Code

```bash
npm install
npx playwright install        # tải trình duyệt (Linux CI dùng thêm --with-deps)
```

Cài extension **Playwright Test for VSCode** (VS Code sẽ tự gợi ý khi mở project) để chạy/debug từng test ngay trong tab Testing.

```bash
npm test                                   # chạy tất cả (UI trên 3 trình duyệt + API)
npm run test:smoke                         # chỉ test gắn tag @smoke
npm run test:api                           # chỉ API
npx playwright test --project=chromium     # chỉ UI trên Chromium
npx playwright test tests/ui/login.spec.ts # 1 file
npx playwright test -g "TC_CART_01"        # 1 test theo tên
npm run test:headed                        # xem trình duyệt chạy
npx playwright test --ui                   # UI mode (xem từng bước, time-travel)
npm run codegen                            # ghi lại thao tác thành code
```

## Kết quả test

- Report HTML: `npm run report` (thư mục `playwright-report/`)
- Ảnh/video khi fail và trace khi retry: `test-results/`
- Trên GitHub: tab **Actions** → chọn run → mục **Artifacts**

## Đẩy lên GitHub

```bash
git init
git add .
git commit -m "feat: initial Playwright automation framework"
git branch -M main
git remote add origin https://github.com/<your-username>/ecommerce-playwright-ts.git
git push -u origin main
```

Sau đó thay `<your-username>` trong badge ở đầu README. Nên commit cả `package-lock.json` (được tạo sau lần `npm install` đầu tiên).

## Hướng phát triển

- Test với các user lỗi của saucedemo (`problem_user`, `performance_glitch_user`, `error_user`, `visual_user`) và ghi bug report thật
- Visual regression bằng `toHaveScreenshot()`
- Lưu trạng thái đăng nhập (`storageState`) để bỏ qua bước login ở mỗi test
- Test responsive với các thiết bị di động (`devices['iPhone 13']`)
- Báo cáo Allure hoặc gửi kết quả lên Slack
