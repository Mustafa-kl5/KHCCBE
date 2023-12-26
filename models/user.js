const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  employeeId: { type: String },
  position: { type: String },
  department: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, default: "pending" },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
const user = mongoose.model("users", userSchema);
module.exports = user;
