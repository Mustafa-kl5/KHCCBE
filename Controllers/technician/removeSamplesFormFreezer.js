const Storage = require("../../models/storage");
const generateLog = require("../../Utils/generateLog");
const removeSamplesFormFreezer = async (req, res) => {
  const { samplesIds } = req.body;
  try {
    for (const element of samplesIds) {
      const sample = await Storage.findOne({ where: { _id: element } });
      await Storage.destroy({ where: { _id: element } });
      generateLog(
        req.user.userId,
        `The employee with technician privileges has been extract from freezer sample with this serial ${sample.sampleSerial}`
      );
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
