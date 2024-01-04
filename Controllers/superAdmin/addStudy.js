const generateLog = require("../../Utils/generateLog");
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

    generateLog(
      req.user.userId,
      `The employee with super admin privileges has been add new Study the following with data \n Study Name:${studyName} \n Study Number:${studyNumber}`
    );
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
