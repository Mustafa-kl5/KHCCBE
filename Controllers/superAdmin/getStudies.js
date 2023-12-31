const Study = require("../../models/study");
const getStudies = async (req, res) => {
  try {
    const studies = await Study.find();
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
