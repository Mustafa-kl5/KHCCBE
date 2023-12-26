const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { generateToken } = require("../../Utils/jwtUtils");

const registrationController = async (req, res) => {
  const {
    email,
    password,
    employeeId,
    position,
    department,
    firstName,
    lastName,
  } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(401).json({ message: "User already exist" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      employeeId,
      position,
      department,
      firstName,
      lastName,
    });
    await user.save();
    const token = generateToken({ userId: user._id, role: user.role });
    res.status(201).json({
      token: token,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = registrationController;
