// src/routes/comment.routes.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controllers");
const { authenticate } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/comments:
 *   post:
 *     tags: ["Comment"]
 *     summary: Thêm comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comicId:
 *                 type: string
 *               comicSlug:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment đã được thêm
 *       400:
 *         description: Lỗi
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, commentController.addComment);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   put:
 *     tags: ["Comment"]
 *     summary: Cập nhật comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment đã được cập nhật
 *       400:
 *         description: Lỗi
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Không có quyền sửa comment này
 */
router.put("/:commentId", authenticate, commentController.updateComment);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     tags: ["Comment"]
 *     summary: Xóa comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment đã được xóa
 *       400:
 *         description: Lỗi
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Không có quyền xóa comment này
 */
router.delete("/:commentId", authenticate, commentController.deleteComment);

/**
 * @swagger
 * /api/comments/{comicSlug}:
 *   get:
 *     tags: ["Comment"]
 *     summary: Lấy comments cho truyện
 *     parameters:
 *       - in: path
 *         name: comicSlug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách comments
 *       500:
 *         description: Lỗi
 */
router.get("/:comicSlug", commentController.getComments);

module.exports = router;