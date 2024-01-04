const generateLog = require("../../Utils/generateLog");
const patient = require("../../models/patient");
const user = require("../../models/user");
const markAsSeen = async (req, res) => {
  const { patientId } = req.body;
  try {
    const theUser = await user.findById({ _id: req.user.userId });
    const seenPatient = await patient.findById({ _id: patientId });
    seenPatient.seen = true;
    seenPatient.seenBy = `${theUser.firstName} ${theUser.lastName}`;
    await seenPatient.save();
    generateLog(
      req.user.userId,
      `
    The employee with technician privileges has been mark patient with following data \n ${
      seenPatient.patientName
    } ${
        seenPatient.mrn === ""
          ? `SSN :${seenPatient.ssn}`
          : `MRN :${seenPatient.mrn}`
      } as seen.`
    );
    res.status(200).json({
      message: `${seenPatient.patientName} Mark as seen successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = markAsSeen;
