const authService = require("../services/auth.services");

exports.register = async (req, res) => {
    try {
        const { email, password, confirmpassword, fullname } = req.body;

        // Validation: Kiểm tra mật khẩu xác nhận
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Mật khẩu xác nhận không khớp" });
        }

        const user = await authService.register(email, password, fullname);
        res.status(201).json({ message: "Đăng ký thành công", user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        res.json({ message: "Đăng nhập thành công", ...data });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};
