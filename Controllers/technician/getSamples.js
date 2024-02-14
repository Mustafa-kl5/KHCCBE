const Sample = require("../../models/sample");
const Study = require("../../models/study");
const Patient = require("../../models/patient");
const { Op } = require("sequelize");

const getSamples = async (req, res) => {
  try {
    const { searchData, isApproved, isRejected } = req.query;
    const filter = {};
    if (searchData) {
      filter[Op.or] = [
        {
          sampleSerial: {
            [Op.like]: `%${searchData}%`,
          },
        },
        {
          "$Study.studyNumber$": {
            [Op.like]: `%${searchData}%`,
          },
        },
        {
          "$Patient.patientName$": {
            [Op.like]: `%${searchData}%`,
          },
        },
        {
          "$Patient.mrn$": {
            [Op.like]: `%${searchData}%`,
          },
        },
        {
          "$Patient.ssn$": {
            [Op.like]: `%${searchData}%`,
          },
        },
      ];
    }
    if (isRejected !== undefined) {
      filter.isRejected = isRejected === "true";
    }
    if (isApproved !== undefined) {
      filter.isApproved = isApproved === "true";
    }
    const samples = await Sample.findAll({
      include: [
        {
          model: Study,
          required: true,
        },
        {
          model: Patient,
          required: true,
        },
      ],
      where: filter,
    });

    res.status(200).json({
      samples,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = getSamples;
