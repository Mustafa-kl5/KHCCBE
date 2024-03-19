const Freezer = require("../../models/freezer");
const Storage = require("../../models/storage");
const { Op } = require("sequelize");

const sampleToExport = async (req, res) => {
  try {
    const { searchData, studyId } = req.query;
    const filter = {};

    if (searchData) {
      filter[Op.or] = [
        {
          "$samples.sampleSerial$": {
            [Op.like]: `%${searchData}%`,
          },
        },
        {
          "$samples.patientName$": {
            [Op.like]: `%${searchData}%`,
          },
        },
        {
          "$samples.mrn$": {
            [Op.like]: `%${searchData}%`,
          },
        },
        {
          "$samples.ssn$": {
            [Op.like]: `%${searchData}%`,
          },
        },
      ];
    }

    const freezers = await Freezer.findAll({
      include: [
        {
          model: Storage,
          as: "samples",
          where: { ...filter, studyNumber: studyId },
          required: true,
        },
      ],
    });
    res.status(200).json({
      freezers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = sampleToExport;
