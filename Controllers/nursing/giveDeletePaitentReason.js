const generateLog = require("../../Utils/generateLog");
const Patient = require("../../models/patient");
const giveDeletePaitentReason = async (req, res) => {
  const { Id, reason } = req.body;
  try {
    await Patient.update(
      { isDeleted: true, deleteReason: reason },
      { where: { _id: Id } }
    );
    const updatedPatient = await Patient.findOne({ where: { _id: Id } });
    generateLog(
      req.user.userId,
      `The employee from nursing department has been delete the following patient with data \n Name: ${
        updatedPatient.patientName
      } \n ${
        updatedPatient.mrn === ""
          ? `SSN :${updatedPatient.ssn}`
          : `MRN :${updatedPatient.mrn}`
      }`
    );
    res.status(200).json({
      message: `${updatedPatient.patientName} Marked as deleted successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = giveDeletePaitentReason;
