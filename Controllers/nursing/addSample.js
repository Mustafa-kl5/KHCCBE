const Sample = require("../../models/sample");
const generateLog = require("../../Utils/generateLog");

const addSample = async (req, res) => {
  const { studyNumber, samples, patientId } = req.body;

  const userId = req.user.userId;
  try {
    for (const element of samples) {
      const sample = new Sample({
        containerType: element.containerType,
        drawnAt: element.drawnAt,
        numberOfSamples: element.numberOfSamples,
        sampleSerial: element.sampleSerial,
        sampleType: element.sampleType,
        storageType: element.storageType,
        studyNumber: studyNumber,
        patient: patientId,
        author: userId,
      });
      await sample.save();
      generateLog(
        req.user.userId,
        `The employee from nursing department has been add the following sample with serial number ${element.sampleSerial} with following`
      );
    }
    res.status(201).json({ message: "samples are added successfully!" });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};
module.exports = addSample;
