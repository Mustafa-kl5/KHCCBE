const Study = require("../../models/study");
const Patient = require("../../models/patient");
const Freezer = require("../../models/freezer");
const Storage = require("../../models/storage");
const studyFile = require("../../models/file");
const { Op } = require("sequelize");

const hotSearch = async (req, res) => {
  const { searchType, searchWith } = req.query;

  if (!searchType || !searchWith) {
    return res
      .status(400)
      .json({ message: "Search type and search query are required." });
  }

  const filter = {};
  try {
    if (searchType === "Study") {
      const study = await Study.findOne({
        include: [{ model: studyFile, as: "files" }],
        where: {
          isApproved: true,
          [Op.or]: [
            { piName: { [Op.like]: `%${searchWith}%` } },
            { studyName: { [Op.like]: `%${searchWith}%` } },
            { studyNumber: { [Op.like]: `%${searchWith}%` } },
            { studyKeywords: { [Op.like]: `%${searchWith}%` } },
          ],
        },
      });
      if (!study) {
        return res.status(404).json({ message: "Study not found." });
      }

      const patient = await Patient.findAll({ where: { StudyId: study._id } });

      const freezers = await Freezer.findAll({
        include: [
          {
            model: Storage,
            as: "samples",
            where: { studyNumber: study._id },
            required: true,
          },
        ],
      });

      return res.status(200).json({ study, patient, freezers });
    }

    if (searchType === "Patient") {
      const patientArray = [];
      const patient = await Patient.findOne({
        where: {
          [Op.or]: [
            { patientName: { [Op.like]: `%${searchWith}%` } },
            { mrn: { [Op.like]: `%${searchWith}%` } },
            { ssn: { [Op.like]: `%${searchWith}%` } },
          ],
        },
      });
      if (!patient) {
        return res.status(404).json({ message: "Patient not found." });
      }
      patientArray.push(patient);
      const study = await Study.findOne({ where: { _id: patient.StudyId } });

      const freezers = await Freezer.findAll({
        include: [
          {
            model: Storage,
            as: "samples",
            where: {
              [Op.or]: [
                { patientName: { [Op.like]: `%${patient.patientName}%` } },
                { mrn: { [Op.like]: `%${patient.mrn}%` } },
                { ssn: { [Op.like]: `%${patient.ssn}%` } },
              ],
            },
            required: true,
          },
        ],
      });
      return res.status(200).json({ study, patient: patientArray, freezers });
    }

    if (searchType === "Sample") {
      const freezers = await Freezer.findAll({
        include: [
          {
            model: Storage,
            as: "samples",
            where: {
              [Op.or]: [
                { khccBioSampleCode: { [Op.like]: `%${searchWith}%` } },
                { sampleSerial: { [Op.like]: `%${searchWith}%` } },
                { patientName: { [Op.like]: `%${searchWith}%` } },
                { mrn: { [Op.like]: `%${searchWith}%` } },
                { ssn: { [Op.like]: `%${searchWith}%` } },
              ],
            },
            required: true,
          },
        ],
      });

      if (freezers.length === 0) {
        return res.status(404).json({ message: "Samples not found." });
      }
      const patientArray = [];
      const patient = await Patient.findOne({
        where: {
          [Op.or]: [
            ,
            { mrn: { [Op.like]: `%${freezers[0].samples[0].mrn}%` } },
            { ssn: { [Op.like]: `%${freezers[0].samples[0].ssn}%` } },
          ],
        },
      });

      if (!patient) {
        return res
          .status(404)
          .json({ message: "Patient not found for the sample." });
      }
      patientArray.push(patient);

      const study = await Study.findOne({ where: { _id: patient.StudyId } });

      return res.status(200).json({ study, patient: patientArray, freezers });
    }

    return res.status(400).json({ message: "Invalid search type." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = hotSearch;
