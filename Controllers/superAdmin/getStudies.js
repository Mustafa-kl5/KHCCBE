const Study = require("../../models/study");
const studyFile = require("../../models/file");

const getStudies = async (req, res) => {
  try {
    const studies = await Study.findAll({
      include: [{ model: studyFile, as: "files" }],
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

module.exports = getStudies;
