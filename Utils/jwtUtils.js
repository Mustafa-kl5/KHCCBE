const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET;

const generateToken = (data) => {
  const payload = { ...data, role: data.role || "pending" };
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

const authorization = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({
        message: "You are not authorized to access this resource.",
      });
    }
    const decoded = jwt.verify(token, secretKey);
    const { userId, role } = decoded;
    req.user = { userId, role };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired. Please log in again.",
      });
    }
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = { generateToken, authorization };
