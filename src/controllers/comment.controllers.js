// src/controllers/comment.controllers.js
const commentService = require("../services/comment.services");

class CommentController {
    async addComment(req, res) {
        try {
            const { comicId, comicSlug, content } = req.body;
            const userId = req.user.userId;
            const comment = await commentService.addComment(userId, comicId, comicSlug, content);
            res.status(201).json({ comment });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getComments(req, res) {
        try {
            const { comicSlug } = req.params;
            const comments = await commentService.getComments(comicSlug);
            res.json({ comments });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new CommentController();