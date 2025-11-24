// src/services/comment.services.js
const Comment = require("../model/comment.model");
const User = require("../model/user.model");

class CommentService {
    async addComment(userId, comicId, comicSlug, content) {
        const comment = await Comment.create({
            userId,
            comicId,
            comicSlug,
            content,
        });
        return comment;
    }

    async getComments(comicId) {
        const comments = await Comment.findAll({
            where: { comicId },
            include: [{
                model: User,
                as: 'user',
                attributes: ['fullname']
            }],
            order: [['createdAt', 'DESC']],
        });
        return comments;
    }
}

module.exports = new CommentService();