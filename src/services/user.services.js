const User = require("../model/user.model");
const bcrypt = require("bcrypt");

class UserService {
    async getAllUsers() {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['passwordHash'] }, // Ẩn passwordHash

            });
            return users;
        } catch (error) {
            throw new Error(`Lỗi khi lấy danh sách user: ${error.message}`);
        }
    }

    async createUser(email, password, fullname) {
        try {
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
        } catch (error) {
            throw new Error(`Lỗi khi tạo user: ${error.message}`);
        }
    }

    async updateUser(id, updates) {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error("User không tồn tại");

            // Chỉ cho phép update fullname và email (nếu email chưa tồn tại)
            const { fullname, email } = updates;
            if (!fullname && !email) {
                throw new Error("Phải cung cấp ít nhất một trường để cập nhật (fullname hoặc email)");
            }
            if (email) {
                const emailExists = await User.findOne({ where: { email, id: { [require('sequelize').Op.ne]: id } } });
                if (emailExists) throw new Error("Email đã tồn tại");
            }

            await user.update({ fullname, email });
            const { passwordHash, ...userWithoutPassword } = user.toJSON();
            return userWithoutPassword;
        } catch (error) {
            throw new Error(`Lỗi khi cập nhật user: ${error.message}`);
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error("User không tồn tại");

            await user.destroy();
            return { message: "User đã được xóa" };
        } catch (error) {
            throw new Error(`Lỗi khi xóa user: ${error.message}`);
        }
    }
}

module.exports = new UserService();