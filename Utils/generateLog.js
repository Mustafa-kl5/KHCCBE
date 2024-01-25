const Log = require("../models/log");
const User = require("../models/user");
const generateLog = async (userId, description) => {
  try {
    const user = await User.findOne({ where: { _id: userId } });
    await Log.create({
      title: `${user.firstName} ${user.lastName} with the following job number: ${user.employeeId}.`,
      description,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = generateLog;
