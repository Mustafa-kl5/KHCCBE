const Freezer = require("../../models/freezer");
const Storage = require("../../models/storage");

const sampleToExport = async (req, res) => {
  try {
    const freezers = await Freezer.findAll({
      include: [{ model: Storage, as: "samples" }],
    });

    res.status(200).json({
      freezers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = sampleToExport;
