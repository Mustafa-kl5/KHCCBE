const generateLog = require("../../Utils/generateLog");
const patient = require("../../models/patient");
const giveDeletePaitentReason = async (req, res) => {
  const { Id, reason } = req.body;
  try {
    const deletedPatient = await patient.findById({ _id: Id });
    deletedPatient.deleteReason = reason;
    deletedPatient.isDeleted = true;
    await deletedPatient.save();
    generateLog(
      req.user.userId,
      `The employee from nursing department has been delete the following patient with data \n Name: ${
        deletedPatient.patientName
      } \n ${
        deletedPatient.mrn === ""
          ? `SSN :${deletedPatient.ssn}`
          : `MRN :${deletedPatient.mrn}`
      }`
    );
    res.status(200).json({
      message: `${deletedPatient.patientName} deleted successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = giveDeletePaitentReason;
