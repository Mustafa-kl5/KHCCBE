const bcrypt = require("bcrypt");
const { generateToken } = require("../../Utils/jwtUtils");
const User = require("../../models/user");

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
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      employeeId,
      position,
      email,
      password: hashedPassword,
      department,
    });

    const token = generateToken({ userId: user._id, role: user.role });
    res.status(201).json({
      role: user.role,
    });
  } catch (error) {
    console.error("Error in registrationController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = registrationController;
