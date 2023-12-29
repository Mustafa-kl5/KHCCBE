const Patient = require("../../models/patient");
const getPatientList = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({
      patients,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = getPatientList;
