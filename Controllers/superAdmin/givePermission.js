const generateLog = require("../../Utils/generateLog");
const User = require("../../models/user");
const givePermission = async (req, res) => {
  const { permission, userId } = req.body;
  try {
    await User.update({ role: permission }, { where: { _id: userId } });
    const pendingUser = await User.findOne({ where: { _id: userId } });
    generateLog(
      req.user.userId,
      `The employee with super admin privileges has been give ${permission} privileges to the following pending user \n User Name : ${pendingUser.firstName} ${pendingUser.lastName} \n Employee ID : ${pendingUser.employeeId}`
    );
    res.status(200).json({
      message: `${pendingUser.firstName} ${pendingUser.lastName} now has the powers of the ${pendingUser.role} department`,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = givePermission;
