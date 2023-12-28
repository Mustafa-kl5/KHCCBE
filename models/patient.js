const { boolean } = require("joi");
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
  createAt: {
    type: Date,
    default: Date.now,
  },
});
const patient = mongoose.model("patients", patientSchema);

module.exports = patient;
