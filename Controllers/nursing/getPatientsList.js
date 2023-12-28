const Patient = require("../../models/patient");
const getPatientList = async (req, res) => {
  try {
    const patientList = await Patient.find();
    res.status(200).json({
      patientList,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = getPatientList;
