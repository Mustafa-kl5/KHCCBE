const mongoose = require("mongoose");

const storageSchema = new mongoose.Schema({
  freezer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "freezers",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
const storage = mongoose.model("storage", storageSchema);

module.exports = storage;
