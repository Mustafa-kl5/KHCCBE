const Study = require("../../models/study");
const Storage = require("../../models/storage");

const { sampleTypes } = require("../../Utils/constant");

const studiesStatistics = async (req, res) => {
  try {
    const studies = await Study.findAll({ where: { isApproved: true } });

    const statistics = await Promise.all(
      studies.map(async (study) => {
        const samples = await Storage.findAll({
          where: { studyNumber: study._id },
        });

        const sampleCounts = {};
        sampleTypes.forEach((type) => {
          sampleCounts[type.sampleType] = 0;
        });

        samples.forEach((sample) => {
          const sampleType = sample.sampleType;
          if (sampleCounts.hasOwnProperty(sampleType)) {
            sampleCounts[sampleType]++;
          }
        });

        return {
          studyName: study.studyName,
          sampleCounts,
        };
      })
    );

    res.status(200).json({
      statistics,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = studiesStatistics;
