// src/routes/favorite.routes.js
const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favorite.controllers");
const { authenticate } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     tags: ["Favorite"]
 *     summary: Thêm vào yêu thích
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
 *               comicName:
 *                 type: string
 *               comicThumb:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đã thêm vào yêu thích
 *       400:
 *         description: Lỗi
 *       401:
 *         description: Unauthorized
 *   get:
 *     tags: ["Favorite"]
 *     summary: Lấy danh sách yêu thích
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách yêu thích
 *       500:
 *         description: Lỗi
 */
router.post("/", authenticate, favoriteController.addFavorite);
router.get("/", authenticate, favoriteController.getFavorites);

/**
 * @swagger
 * /api/favorites/{comicId}:
 *   delete:
 *     tags: ["Favorite"]
 *     summary: Xóa khỏi yêu thích
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: comicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã xóa khỏi yêu thích
 *       400:
 *         description: Lỗi
 *       401:
 *         description: Unauthorized
 */
router.delete("/:comicId", authenticate, favoriteController.removeFavorite);

module.exports = router;