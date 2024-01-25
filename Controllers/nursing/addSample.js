const Sample = require("../../models/sample");
const Study = require("../../models/study");
const Patient = require("../../models/patient");
const generateLog = require("../../Utils/generateLog");

const addSample = async (req, res) => {
  const { studyNumber, samples, patientId } = req.body;
  const study = await Study.findOne({ where: { _id: studyNumber } });
  const patient = await Patient.findOne({ where: { _id: patientId } });
  try {
    for (const element of samples) {
      const sample = await Sample.create({
        containerType: element.containerType,
        drawnAt: element.drawnAt,
        numberOfSamples: element.numberOfSamples,
        sampleSerial: element.sampleSerial,
        sampleType: element.sampleType,
        storageType: element.storageType,
      });
      await sample.setStudy(study);
      await sample.setPatient(patient);
      generateLog(
        req.user.userId,
        `The employee from nursing department has been add the following sample with serial number ${element.sampleSerial} with following`
      );
    }

    res.status(201).json({ message: "samples are added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};
module.exports = addSample;
