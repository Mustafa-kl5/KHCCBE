const Patient = require("../../models/patient");

const addPatientController = async (req, res) => {
  const {
    patientName,
    ssn,
    mrn,
    dayCode,
    researchId,
    birthDate,
    admitionRecDate,
    gender,
    sampleDrawing,
  } = req.body;
  try {
    const patient = new Patient({
      patientName,
      ssn,
      mrn,
      dayCode,
      researchId,
      birthDate,
      admitionRecDate,
      gender,
      sampleDrawing,
    });
    await patient.save();
    res.status(201).json({ massege: "Patient created successfully!", patient });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};
module.exports = addPatientController;
