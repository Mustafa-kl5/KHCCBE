const generateLog = require("../../Utils/generateLog");
const Sample = require("../../models/sample");
const rejectSample = async (req, res) => {
  const { sampleId, rejectionReason } = req.body;
  try {
    const sample = await Sample.findById({ _id: sampleId });
    sample.isRejected = true;
    sample.rejectReason = rejectionReason;
    await sample.save();
    generateLog(
      req.user.userId,
      `
    The employee with technician privileges has been reject sample with this serial \n ${sample.sampleSerial}`
    );
    res.status(200).json({
      message: `${sample.sampleSerial} is rejected successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = rejectSample;
