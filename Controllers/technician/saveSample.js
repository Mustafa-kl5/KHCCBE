const generateLog = require("../../Utils/generateLog");
const Storage = require("../../models/storage");
const Freezer = require("../../models/freezer");
const Sample = require("../../models/sample");

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
    await Sample.update({ isStored: true }, { where: { _id: sampleId } });
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
      await freezer.addSample(sample);
    });
    const samples = await Storage.findAll();
    res.status(201).json({ message: "Samples stored successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = saveSample;