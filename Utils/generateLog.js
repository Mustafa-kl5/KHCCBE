const Log = require("../models/log");
const User = require("../models/user");

const generateLog = async (userId, description) => {
  try {
    const user = await User.findById(userId);
    const log = new Log({
      title: `${user.firstName} ${user.lastName} with the following job number: ${user.employeeId}.`,
      description,
    });
    await log.save();
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = generateLog;
