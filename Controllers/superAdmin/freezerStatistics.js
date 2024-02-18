const Storage = require("../../models/storage");
const Freezer = require("../../models/freezer");
const { sampleTypes } = require("../../Utils/constant");

const freezerStatistics = async (req, res) => {
  try {
    const freezers = await Freezer.findAll({
      include: [{ model: Storage, as: "samples" }],
    });

    const statistics = freezers.map((freezer) => {
      const samplesCount = sampleTypes.map((type) => ({
        sampleType: type.sampleType,
        count: freezer.samples.filter(
          (sample) => sample.sampleType === type.sampleType
        ).length,
      }));

      return {
        freezerName: freezer.freezerName,
        freezerModel: freezer.freezerModel,
        samplesCount,
      };
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

module.exports = freezerStatistics;
