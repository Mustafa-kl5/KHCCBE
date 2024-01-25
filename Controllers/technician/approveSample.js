const generateLog = require("../../Utils/generateLog");
const Sample = require("../../models/sample");
const approveSample = async (req, res) => {
  const { sampleId, khccBioSampleCode } = req.body;
  try {
    await Sample.update(
      { isApproved: true, khccBioSampleCode: khccBioSampleCode },
      { where: { _id: sampleId } }
    );
    const sample = await Sample.findOne({ where: { _id: sampleId } });
    generateLog(
      req.user.userId,
      `
    The employee with technician privileges has been approve sample with this serial \n ${sample.sampleSerial} and this KHCC Code : ${sample.khccBioSampleCode}`
    );
    res.status(200).json({
      message: `${sample.sampleSerial} is approved successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = approveSample;
