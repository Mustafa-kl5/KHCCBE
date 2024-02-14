const Sample = require("../../models/sample");
const Study = require("../../models/study");
const Patient = require("../../models/patient");
const { Op } = require("sequelize");
const getApprovalSamples = async (req, res) => {
  try {
    const { searchData } = req.query;
    const filter = {};
    if (searchData) {
      filter[Op.or] = [
        {
          sampleSerial: {
            [Op.like]: `%${searchData}%`,
          },
        },
        {
          khccBioSampleCode: {
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
    const samples = await Sample.findAll({
      where: { isApproved: true, isStored: false, ...filter },
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

module.exports = getApprovalSamples;
