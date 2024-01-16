const User = require("../models/user");
const validationRole = (role) => {
  return async (req, res, next) => {
    try {
      const TokenRole = req.user.role;
      if (role.includes(TokenRole)) {
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
};

module.exports = validationRole;
