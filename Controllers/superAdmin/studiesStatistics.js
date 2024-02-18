const Study = require("../../models/study");
const Storage = require("../../models/storage");

const { sampleTypes } = require("../../Utils/constant");

const studiesStatistics = async (req, res) => {
  try {
    const statistics = [];
    const studies = await Study.findAll();
    studies.forEach(async (item) => {
      const samples = await Storage.findAll({
        where: { studyNumber: item._id },
      });
      statistics.push({
        studyName: item.studyName,
        samples: samples,
      });
    });

    res.status(200).json({
      statistics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = studiesStatistics;
