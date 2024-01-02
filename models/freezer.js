const mongoose = require("mongoose");

const freezerSchema = new mongoose.Schema({
  freezerName: { type: String },
  freezerModel: { type: String },
  freezerLocation: { type: String },
  freezerType: { type: String },
  NumberOfShelves: { type: Number },
  BoxesPerShelf: { type: Number },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
const freezer = mongoose.model("freezers", freezerSchema);

module.exports = freezer;
