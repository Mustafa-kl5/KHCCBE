const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
const log = mongoose.model("logs", logSchema);

module.exports = log;
