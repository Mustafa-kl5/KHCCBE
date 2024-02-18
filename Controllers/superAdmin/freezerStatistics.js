const Storage = require("../../models/storage");
const Freezer = require("../../models/freezer");

const sampleTypes = [
  {
    id: 1,
    sampleType: "Blood samples",
  },
  {
    id: 2,
    sampleType: "Body fluids",
  },
  {
    id: 3,
    sampleType: "ABG’s sample",
  },
  {
    id: 4,
    sampleType: "24 hours urine collection",
  },
  {
    id: 5,
    sampleType: "Bone marrow",
  },
  {
    id: 6,
    sampleType: "Biopsy",
  },
  {
    id: 7,
    sampleType: "Sputum",
  },
  {
    id: 8,
    sampleType: "Spot urine",
  },
  {
    id: 9,
    sampleType: "CSF",
  },
  {
    id: 10,
    sampleType: "Stool",
  },
  {
    id: 11,
    sampleType: "Swaps",
  },
];

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
