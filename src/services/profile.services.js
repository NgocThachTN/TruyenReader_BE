const User = require("../model/user.model");
const FavoriteService = require("./favorite.services");
const ReadingHistoryService = require("./readingHistory.services");

class ProfileService {
    async getProfile(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: { exclude: ['passwordHash', 'otp', 'otpExpires'] }
            });
            if (!user) throw new Error("User không tồn tại");
            const userData = user.toJSON();
            delete userData.otp;
            delete userData.otpExpires;

            const favorites = await FavoriteService.getFavorites(userId);
            const readingHistory = await ReadingHistoryService.getReadingHistory(userId);
            return {
                user: userData,
                favorites,
                readingHistory
            };
        } catch (error) {
            throw new Error(`Lỗi khi lấy profile: ${error.message}`);
        }
    }

    async updateProfile(userId, updates) {
        try {
            const user = await User.findByPk(userId);
            if (!user) throw new Error("User không tồn tại");

            // Chỉ cho phép update fullname và email (nếu email chưa tồn tại)
            const { fullname, email } = updates;
            if (!fullname && !email) {
                throw new Error("Phải cung cấp ít nhất một trường để cập nhật (fullname hoặc email)");
            }
            if (email) {
                const emailExists = await User.findOne({ where: { email, userId: { [require('sequelize').Op.ne]: userId } } });
                if (emailExists) throw new Error("Email đã tồn tại");
            }

            await user.update({ fullname, email });
            const { passwordHash, ...userWithoutPassword } = user.toJSON();
            return userWithoutPassword;
        } catch (error) {
            throw new Error(`Lỗi khi cập nhật profile: ${error.message}`);
        }
    }
}

module.exports = new ProfileService();