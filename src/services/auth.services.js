const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const { sendResetEmail } = require("./mail.services");

class AuthService {
    async register(email, password, fullname) {
        const exists = await User.findOne({ where: { email } });
        if (exists) throw new Error("Email đã tồn tại");

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            passwordHash: hash,
            fullname,
        });

        // Trả về user mà không có passwordHash
        const { passwordHash, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error("Sai email hoặc mật khẩu");

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) throw new Error("Sai email hoặc mật khẩu");

        const token = jwt.sign(
            {
                userId: user.userId,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const userData = user.toJSON();
        delete userData.passwordHash;

        return { token, user: userData };
    }

    async forgotPassword(email) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error("Email không tồn tại");

        const resetToken = jwt.sign(
            { userId: user.userId, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "15m" } // Token reset ngắn hơn
        );

        const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

        await sendResetEmail(email, resetLink);
    }

    async resetPassword(token, newPassword) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(decoded.userId);
            if (!user) throw new Error("User không tồn tại");

            const hash = await bcrypt.hash(newPassword, 10);
            await user.update({ passwordHash: hash });
        } catch (err) {
            throw new Error("Token không hợp lệ hoặc đã hết hạn");
        }
    }

    async changePassword(userId, oldPassword, newPassword) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error("User không tồn tại");

        const match = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!match) throw new Error("Mật khẩu cũ không đúng");

        const hash = await bcrypt.hash(newPassword, 10);
        await user.update({ passwordHash: hash });
    }
}

module.exports = new AuthService();
