const Study = require("../../models/study");
const addStudy = async (req, res) => {
  const { studyName, piName, studyNumber, studyKeywords, studyInitDate } =
    req.body;
  try {
    const uploadedFiles = req.uploadedFiles;
    const study = new Study({
      studyName,
      piName,
      studyNumber,
      studyKeywords,
      studyInitDate,
      files: uploadedFiles,
    });
    await study.save();
    res.status(201).json({
      message: `${studyName} study added successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = addStudy;
