# Hướng Dẫn Code Đơn Giản Cho Người Mới Học Node.js

## Dự Án Là Gì?
Đây là một API đơn giản dùng Node.js và Express. Nó giúp quản lý người dùng và đăng nhập. Sử dụng PostgreSQL để lưu dữ liệu.

## Cấu Trúc Cơ Bản
- `index.js`: File chính, khởi động server
- `src/routes/`: Định nghĩa đường dẫn API (như `/api/users`)
- `src/controllers/`: Xử lý yêu cầu từ client
- `src/services/`: Logic đơn giản cho từng chức năng
- `src/model/`: Định nghĩa bảng dữ liệu

## Cách Viết Code Đơn Giản
- Sử dụng hàm async/await cho dễ hiểu
- Trả về JSON đơn giản: `{ message: "Thành công" }`
- Không dùng class phức tạp, dùng function thường
- Comment bằng tiếng Việt
- Kiểm tra lỗi cơ bản: if (!data) throw new Error("Lỗi")

## Ví Dụ Code Đơn Giản
### Tạo Route
```javascript
// src/routes/user.routes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Danh sách user" });
});

module.exports = router;
```

### Tạo Controller
```javascript
// src/controllers/user.controllers.js
const getUsers = (req, res) => {
  try {
    // Logic đơn giản
    res.json({ users: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUsers };
```

### Tạo Service
```javascript
// src/services/user.services.js
const getAllUsers = async () => {
  // Trả về dữ liệu đơn giản
  return [];
};

module.exports = { getAllUsers };
```

## Quy Tắc Viết Code
- Tên hàm: getUsers, createUser (dễ hiểu)
- Không dùng bcrypt phức tạp, dùng mật khẩu đơn giản cho học
- JWT: Tạo token đơn giản với jsonwebtoken
- Database: Dùng Sequelize.findAll() cơ bản
- Swagger: Thêm comment đơn giản cho tài liệu

## Chạy Dự Án
1. Cài đặt: `npm install`
2. Tạo file `.env` với DB_NAME=nodejs_test
3. Chạy: `npm start`
4. Truy cập: http://localhost:3000/api/swagger.html

## Lưu Ý Cho Người Mới
- Bắt đầu từ route đơn giản, thêm controller, rồi service
- Test từng bước: console.log() để kiểm tra
- Nếu lỗi DB, kiểm tra .env và PostgreSQL đang chạy
- Viết code từng dòng, không vội vàng</content>
<parameter name="filePath">c:\Users\Hammo\Documents\Coding\nodejs-test\.github\copilot-instructions.md