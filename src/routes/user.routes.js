const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: ["User"]
 *     summary: Lấy danh sách tất cả user
 *     responses:
 *       200:
 *         description: Danh sách user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   fullname:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *   post:
 *     tags: ["User"]
 *     summary: Tạo user mới
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
 *               fullname:
 *                 type: string
 *     responses:
 *       201:
 *         description: User đã được tạo
 *       400:
 *         description: Lỗi khi tạo user
 */
router.get("/", userController.getUsers);
router.post("/", userController.createUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     tags: ["User"]
 *     summary: Cập nhật user
 *     parameters:
 *       - in: path
 *         name: userId
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
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User đã được cập nhật
 *       400:
 *         description: Lỗi khi cập nhật user
 *   delete:
 *     tags: ["User"]
 *     summary: Xóa user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User đã được xóa
 *       400:
 *         description: Lỗi khi xóa user
 */
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;