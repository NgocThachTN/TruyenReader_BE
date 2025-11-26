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

    async updateComment(commentId, userId, content) {
        const comment = await Comment.findOne({
            where: { commentId, userId }
        });

        if (!comment) {
            throw new Error("Comment không tồn tại hoặc bạn không có quyền sửa");
        }

        await comment.update({ content });
        return comment;
    }

    async deleteComment(commentId, userId) {
        const comment = await Comment.findOne({
            where: { commentId, userId }
        });

        if (!comment) {
            throw new Error("Comment không tồn tại hoặc bạn không có quyền xóa");
        }

        await comment.destroy();
        return { message: "Comment đã được xóa" };
    }

    async getComments(comicSlug) {
        const comments = await Comment.findAll({
            where: { comicSlug },
            include: [{
                model: User,
                as: 'user',
                attributes: ['userId', 'fullname']
            }],
            order: [['createdAt', 'DESC']],
        });
        return comments;
    }
}

module.exports = new CommentService();