const generateLog = require("../../Utils/generateLog");
const Patient = require("../../models/patient");
const User = require("../../models/user");
const markAsSeen = async (req, res) => {
  const { patientId } = req.body;
  try {
    const user = await User.findOne({ where: { _id: req.user.userId } });
    await Patient.update(
      { seen: true, seenBy: `${user.firstName} ${user.lastName}` },
      { where: { _id: patientId } }
    );
    const patient = await Patient.findOne({ where: { _id: patientId } });
    generateLog(
      req.user.userId,
      `
    The employee with technician privileges has been mark patient with following data \n ${
      patient.patientName
    } ${
        patient.mrn === "" ? `SSN :${patient.ssn}` : `MRN :${patient.mrn}`
      } as seen.`
    );
    res.status(200).json({
      message: `${patient.patientName} Mark as seen successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = markAsSeen;
