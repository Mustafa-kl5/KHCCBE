const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema({
  storageType: { type: String },
  containerType: { type: String },
  sampleType: { type: String },
  drawnAt: { type: String },
  numberOfSamples: { type: String },
  sampleSerial: { type: String },
  rejectReason: { type: String, default: "" },
  khccBioSampleCode: { type: String, default: "" },
  isRejected: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
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
