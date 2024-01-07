const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientName: { type: String },
  ssn: { type: String },
  mrn: { type: String },
  dayCode: { type: String },
  researchId: { type: String },
  birthDate: { type: String },
  admitionRecDate: { type: String },
  gender: { type: String },
  sampleDrawing: { type: String },
  seen: { type: Boolean, default: false },
  seenBy: { type: String, default: "unseen yet" },
  isDeleted: { type: Boolean, default: false },
  deleteReason: { type: String, default: "" },
  createAt: {
    type: Date,
    default: Date.now,
  },
  study: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studies",
  },
});
const patient = mongoose.model("patients", patientSchema);

module.exports = patient;
