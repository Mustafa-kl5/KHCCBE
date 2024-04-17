const generateLog = require("../../Utils/generateLog");
const Storage = require("../../models/storage");
const Freezer = require("../../models/freezer");
const Sample = require("../../models/sample");
const SampleBackUp = require("../../models/storageBackUp");

const saveSample = async (req, res) => {
  const {
    sampleId,
    sampleType,
    freezerId,
    mainBoxType,
    subBoxType,
    mainBoxId,
    subBoxId,
    chosenCell,
    storageType,
    containerType,
    drawnAt,
    numberOfSamples,
    studyNumber,
    patientName,
    mrn,
    ssn,
    birthDate,
    gender,
    sampleDrawing,
    sampleSerial,
    khccBioSampleCode,
  } = req.body;
  try {
    const cells = chosenCell.split(",");
    await Freezer.findOne({ where: { _id: freezerId } });
    const freezer = await Freezer.findOne({ where: { _id: freezerId } });
    cells.forEach(async (element) => {
      const sample = await Storage.create({
        mainBoxType,
        subBoxType,
        mainBoxId,
        subBoxId,
        chosenCell,
        storageType,
        containerType,
        drawnAt,
        numberOfSamples,
        studyNumber,
        patientName,
        mrn,
        ssn,
        birthDate,
        gender,
        sampleDrawing,
        sampleSerial,
        khccBioSampleCode,
        cell: element.trim(),
        sampleType,
      });
      const sampleBackUp = await SampleBackUp.create({
        mainBoxType,
        subBoxType,
        mainBoxId,
        subBoxId,
        chosenCell,
        storageType,
        containerType,
        drawnAt,
        numberOfSamples,
        studyNumber,
        patientName,
        mrn,
        ssn,
        birthDate,
        gender,
        sampleDrawing,
        sampleSerial,
        khccBioSampleCode,
        cell: element.trim(),
        sampleType,
      });
      await freezer.addSample(sample);
      await freezer.addSamplesBackUp(sampleBackUp);
      generateLog(
        req.user.userId,
        `The employee with technician privileges has been add sample to freezer ${
          freezer.freezerName
        } with this sample serial :${sampleSerial} at cell ${element.trim()}`
      );
    });
    await Sample.update({ isStored: true }, { where: { _id: sampleId } });
    res.status(201).json({ message: "Samples stored successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = saveSample;
