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
 * /api/comments/{comicId}:
 *   get:
 *     tags: ["Comment"]
 *     summary: Lấy comments cho truyện
 *     parameters:
 *       - in: path
 *         name: comicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách comments
 *       500:
 *         description: Lỗi
 */
router.get("/:comicId", commentController.getComments);

module.exports = router;