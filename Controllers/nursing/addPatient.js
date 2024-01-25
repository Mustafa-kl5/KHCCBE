const generateLog = require("../../Utils/generateLog");
const Patient = require("../../models/patient");
const Study = require("../../models/study");

const addPatientController = async (req, res) => {
  const {
    studyId,
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
    const study = await Study.findOne({ where: { _id: studyId } });
    const patient = await Patient.create({
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
    await patient.setStudy(study);
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
