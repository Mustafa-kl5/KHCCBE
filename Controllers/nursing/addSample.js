const Sample = require("../../models/sample");

const addSample = async (req, res) => {
  const { studyNumber, samples, patientId } = req.body;
  const userId = req.user.userId;
  try {
    for (const element of samples) {
      const sample = new Sample({
        author: userId,
        containerType: element.containerType,
        drawnAt: element.drawnAt,
        numberOfSamples: element.numberOfSamples,
        sampleSerial: element.sampleSerial,
        sampleType: element.sampleType,
        studyNumber: studyNumber,
        patient: patientId,
      });
      await sample.save();
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
