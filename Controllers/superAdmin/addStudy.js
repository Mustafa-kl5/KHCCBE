const generateLog = require("../../Utils/generateLog");
const Study = require("../../models/study");
const studyFile = require("../../models/file");

const addStudy = async (req, res) => {
  const { studyName, piName, studyNumber, studyKeywords, studyInitDate } =
    req.body;
  try {
    const uploadedFiles = req.uploadedFiles;
    const study = await Study.create({
      studyName,
      piName,
      studyNumber,
      studyKeywords,
      studyInitDate,
    });

    uploadedFiles.map(async (item) => {
      const file = await studyFile.create({ filename: item });
      await study.addFile(file);
    });

    generateLog(
      req.user.userId,
      `The employee with super admin privileges has been add new Study the following with data \n Study Name:${studyName} \n Study Number:${studyNumber}`
    );

    res.status(201).json({
      message: "Study are add successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = addStudy;
