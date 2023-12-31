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
  closeData: {
    type: String,
    default: null,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
});
const study = mongoose.model("studies", studySchema);

module.exports = study;
