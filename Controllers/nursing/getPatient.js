const Patient = require("../../models/patient");
const { Op } = require("sequelize");

const getPatient = async (req, res) => {
  try {
    try {
      const { patientId } = req.query;
      const patient = await Patient.findOne({
        where: { _id: patientId },
      });
      if (patient) {
        res.status(200).json({
          message: "Patient Not Found",
          patientFound: true,
        });
      } else {
        res.status(400).json({
          message: "Patient Not Found",
          patientFound: false,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = getPatient;
