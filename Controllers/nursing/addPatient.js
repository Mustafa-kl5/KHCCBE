const generateLog = require("../../Utils/generateLog");
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
    generateLog(
      req.user.userId,
      `The employee from nursing department has been add the following patient 
    \n Patient Name ${patientName} with following ${
        mrn === "" ? `SSN :${ssn}` : `MRN :${mrn}`
      }`
    );
    res.status(201).json({ message: "Patient created successfully!" });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};
module.exports = addPatientController;
