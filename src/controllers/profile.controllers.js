const profileService = require("../services/profile.services");

class ProfileController {
    async getProfile(req, res) {
        try {
            const userId = req.user.userId;
            const profile = await profileService.getProfile(userId);
            res.status(200).json(profile);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateProfile(req, res) {
        try {
            const userId = req.user.userId;
            const updates = req.body;
            const user = await profileService.updateProfile(userId, updates);
            res.status(200).json({ user });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new ProfileController();