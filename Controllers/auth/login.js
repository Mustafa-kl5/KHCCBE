const { generateToken } = require("../../Utils/jwtUtils");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (passwordCheck) {
        const token = generateToken({ userId: user._id, role: user.role });
        res.status(200).json({
          token: token,
          role: user.role,
        });
      } else {
        res.status(400).json({
          message: "Email or password in wrong",
        });
      }
    } else {
      res.status(400).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};
module.exports = loginController;
