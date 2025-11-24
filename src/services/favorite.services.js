// src/services/favorite.services.js
const Favorite = require("../model/favorite.model");

class FavoriteService {
    async addFavorite(userId, comicId, comicSlug, comicName, comicThumb) {
        const existing = await Favorite.findOne({ where: { userId, comicId } });
        if (existing) throw new Error("Đã thêm vào yêu thích");

        const favorite = await Favorite.create({
            userId,
            comicId,
            comicSlug,
            comicName,
            comicThumb,
        });
        return favorite;
    }

    async removeFavorite(userId, comicId) {
        const favorite = await Favorite.findOne({ where: { userId, comicId } });
        if (!favorite) throw new Error("Không tìm thấy trong yêu thích");

        await favorite.destroy();
        return { message: "Đã xóa khỏi yêu thích" };
    }

    async getFavorites(userId) {
        const favorites = await Favorite.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });
        return favorites;
    }
}

module.exports = new FavoriteService();