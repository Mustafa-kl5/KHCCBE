const mongoose = require("mongoose");

const studySchema = new mongoose.Schema({
  studyName: { type: String },
  piName: { type: String },
  studyNumber: { type: String },
  studyKeywords: { type: String },
  studyInitDate: { type: String },
  files: [String],
  createAt: {
    type: Date,
    default: Date.now,
  },
});
const study = mongoose.model("studies", studySchema);

module.exports = study;
