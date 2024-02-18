const Study = require("../../models/study");
const studyFile = require("../../models/file");
const { Op } = require("sequelize");

const getPendingStudies = async (req, res) => {
  try {
    const { study } = req.query;
    const filter = {};

    if (study) {
      filter[Op.or] = [
        {
          piName: {
            [Op.like]: `%${study}%`,
          },
        },
        {
          studyName: {
            [Op.like]: `%${study}%`,
          },
        },
        {
          studyNumber: {
            [Op.like]: `%${study}%`,
          },
        },
        {
          studyKeywords: {
            [Op.like]: `%${study}%`,
          },
        },
      ];
    }
    const studies = await Study.findAll({
      include: [{ model: studyFile, as: "files" }],
      where: { ...filter, isApproved: false },
    });
    res.status(200).json({
      studies: studies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = getPendingStudies;
