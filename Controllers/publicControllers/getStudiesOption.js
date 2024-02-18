const Study = require("../../models/study");
const getStudiesOption = async (req, res) => {
  try {
    const studies = await Study.findAll({
      attributes: ["studyName", "studyNumber", "_id"],
      where: { isApproved: true },
    });
    res.status(200).json({
      options: studies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = getStudiesOption;
