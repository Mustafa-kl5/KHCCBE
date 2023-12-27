const User = require("../models/user");
const validationRole = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById({ _id: userId });
    const TokenRole = req.user.role;
    if (TokenRole === user.role) {
      next();
    } else {
      res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = validationRole;
