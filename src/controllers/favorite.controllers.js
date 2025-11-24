// src/controllers/favorite.controllers.js
const favoriteService = require("../services/favorite.services");

class FavoriteController {
    async addFavorite(req, res) {
        try {
            const { comicId, comicSlug, comicName, comicThumb } = req.body;
            const userId = req.user.userId;
            const favorite = await favoriteService.addFavorite(userId, comicId, comicSlug, comicName, comicThumb);
            res.status(201).json({ favorite });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async removeFavorite(req, res) {
        try {
            const { comicId } = req.params;
            const userId = req.user.userId;
            const result = await favoriteService.removeFavorite(userId, comicId);
            res.json(result);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getFavorites(req, res) {
        try {
            const userId = req.user.userId;
            const favorites = await favoriteService.getFavorites(userId);
            res.json({ favorites });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new FavoriteController();