const patient = require("../../models/patient");
const user = require("../../models/user");
const seen = async (req, res) => {
  const { patientId } = req.body;
  try {
    const theUser = await user.findById({ _id: req.user.userId });
    const seenPatient = await patient.findById({ _id: patientId });
    seenPatient.seen = true;
    seenPatient.seenBy = `${theUser.firstName} ${theUser.lastName}`;
    await seenPatient.save();
    res.status(200).json({
      message: `${seenPatient.patientName} seen successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = seen;
