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
 *                   id:
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
 */
router.get("/", userController.getUsers);

module.exports = router;