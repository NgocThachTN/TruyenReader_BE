const router = require("express").Router();
const controller = require("../controllers/auth.controllers");
const { authenticate } = require("../middlewares/auth.middleware");
const passport = require("passport");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: ["Authentication"]
 *     summary: Đăng ký người dùng mới
 *     description: Tạo tài khoản người dùng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmpassword:
 *                 type: string
 *               fullname:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi dữ liệu đầu vào
 */
router.post("/register", controller.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: ["Authentication"]
 *     summary: Đăng nhập
 *     description: Đăng nhập vào hệ thống
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Sai thông tin đăng nhập
 */
router.post("/login", controller.login);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     tags: ["Authentication"]
 *     summary: Refresh access token
 *     description: Sử dụng refresh token để lấy access token mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed
 *       401:
 *         description: Invalid refresh token
 */
router.post("/refresh-token", controller.refreshToken);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: ["Authentication"]
 *     summary: Đăng xuất
 *     description: Invalidate refresh token của thiết bị hiện tại
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *       401:
 *         description: Unauthorized
 */
router.post("/logout", authenticate, controller.logout);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     tags: ["Authentication"]
 *     summary: Quên mật khẩu
 *     description: Gửi email reset mật khẩu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email đã được gửi
 *       400:
 *         description: Lỗi
 */
router.post("/forgot-password", controller.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     tags: ["Authentication"]
 *     summary: Reset mật khẩu với OTP
 *     description: Đặt lại mật khẩu với OTP từ email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mật khẩu đã được reset
 *       400:
 *         description: Lỗi
 */
router.post("/reset-password", controller.resetPassword);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     tags: ["Authentication"]
 *     summary: Xác nhận OTP
 *     description: Kiểm tra OTP hợp lệ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP hợp lệ
 *       400:
 *         description: OTP không hợp lệ
 */
router.post("/verify-otp", controller.verifyOtp);

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     tags: ["Authentication"]
 *     summary: Đổi mật khẩu
 *     description: Đổi mật khẩu cho user đã đăng nhập (cần JWT token)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mật khẩu đã được đổi
 *       400:
 *         description: Lỗi
 *       401:
 *         description: Unauthorized
 */
router.post("/change-password", authenticate, controller.changePassword);

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     tags: ["Authentication"]
 *     summary: Đăng nhập với Google
 *     description: Redirect đến Google để authenticate
 *     responses:
 *       302:
 *         description: Redirect to Google
 */
router.get("/google", passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }));

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     tags: ["Authentication"]
 *     summary: Callback từ Google
 *     description: Xử lý callback từ Google và trả JWT cùng thông tin user
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đăng nhập Google thành công"
 *                 token:
 *                   type: string
 *                   example: "jwt_token_here"
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "user@gmail.com"
 *                     fullname:
 *                       type: string
 *                       example: "Nguyễn Văn A"
 *                     avatar:
 *                       type: string
 *                       example: "https://lh3.googleusercontent.com/a-/avatar.jpg"
 *       302:
 *         description: Redirect về FE với token và user info
 *       500:
 *         description: Lỗi
 */
router.get("/google/callback",
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const authService = require("../services/auth.services");
      const RefreshToken = require("../model/refreshToken.model");
      const { accessToken, refreshToken } = authService.generateTokens(req.user);

      // Lưu refresh token
      await RefreshToken.create({
        token: refreshToken,
        userId: req.user.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      // Lấy thông tin user để trả về
      const userData = {
        userId: req.user.userId,
        email: req.user.email,
        fullname: req.user.fullname,
        avatar: req.user.avatar
      };

      // Nếu là API call (không phải browser redirect), trả về JSON
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.json({
          message: "Đăng nhập Google thành công",
          accessToken,
          refreshToken,
          user: userData
        });
      }

      // Redirect to FE with token và user info
      const feUrl = process.env.NODE_ENV === 'production'
        ? process.env.FE_URL || 'https://your-fe-domain.com'  // Thay bằng FE production URL
        : 'http://localhost:3000';  // Thay bằng FE local port

      // Encode user info để truyền qua URL
      const userInfo = encodeURIComponent(JSON.stringify(userData));
      res.redirect(`${feUrl}?accessToken=${accessToken}&refreshToken=${refreshToken}&user=${userInfo}`);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
); module.exports = router;
