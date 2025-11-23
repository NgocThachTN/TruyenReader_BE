const User = require("../model/user.model");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['passwordHash'] }, // Ẩn passwordHash
    });
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};