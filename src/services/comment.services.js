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

    async getComments(comicSlug) {
        const comments = await Comment.findAll({
            where: { comicSlug },
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