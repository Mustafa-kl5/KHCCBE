const users = require("../../models/user");
const usersPermission = async (req, res) => {
  try {
    const pendingUsers = await users.find({ role: "pending" });
    res.status(200).json({
      users: pendingUsers,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = usersPermission;
