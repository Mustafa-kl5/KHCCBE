const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema({
  containerType: { type: String },
  sampleType: { type: String },
  drawnAt: { type: String },
  numberOfSamples: { type: String },
  sampleSerial: { type: String },
  createAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  studyNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studies",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patients",
  },
});
const sample = mongoose.model("samples", sampleSchema);
module.exports = sample;
