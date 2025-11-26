const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controllers");
const { authenticate } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/profile:
 *   get:
 *     tags: ["Profile"]
 *     summary: Lấy profile của user hiện tại
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     fullname:
 *                       type: string
 *                     role:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       favoriteId:
 *                         type: integer
 *                       comicId:
 *                         type: integer
 *                       comicSlug:
 *                         type: string
 *                       comicName:
 *                         type: string
 *                       comicThumb:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 readingHistory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       historyId:
 *                         type: integer
 *                       comicId:
 *                         type: integer
 *                       comicSlug:
 *                         type: string
 *                       comicName:
 *                         type: string
 *                       comicThumb:
 *                         type: string
 *                       currentChapter:
 *                         type: integer
 *                       lastReadAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Chưa đăng nhập
 *       500:
 *         description: Lỗi server
 *   put:
 *     tags: ["Profile"]
 *     summary: Cập nhật profile của user hiện tại
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     fullname:
 *                       type: string
 *                     role:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Lỗi khi cập nhật profile
 *       401:
 *         description: Chưa đăng nhập
 *       500:
 *         description: Lỗi server
 */
router.get("/", authenticate, profileController.getProfile);
router.put("/", authenticate, profileController.updateProfile);

module.exports = router;