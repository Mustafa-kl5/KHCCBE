const bcrypt = require("bcrypt");
const { generateToken } = require("../../Utils/jwtUtils");
const {
  openConnection,
  closeConnection,
  executeQuery,
} = require("../../DataBase/dataBaceHandler");
const sql = require("mssql");

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

  let pool;

  try {
    // Open the database connection
    pool = await openConnection();
    // Check if the user already exists
    const existingUser = await executeQuery(pool, "SELECT * FROM Users");

    res.status(201).json({
      existingUser,
    });
  } catch (error) {
    console.error("Error in registrationController:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (pool) {
      await closeConnection(pool);
    }
  }
};

module.exports = registrationController;
