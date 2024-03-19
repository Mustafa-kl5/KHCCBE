const Storage = require("../../models/storage");

const removeSamplesFormFreezer = async (req, res) => {
  const { samplesIds } = req.body;
  try {
    for (const element of samplesIds) {
      await Storage.destroy({ where: { _id: element } });
    }

    res
      .status(200)
      .json({ message: "Samples extracted from freezers successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = removeSamplesFormFreezer;
