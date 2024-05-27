const Freezer = require("../../models/freezer");
const StorageBackUp = require("../../models/storageBackUp");
const { Op } = require("sequelize");

const samplesBackups = async (req, res) => {
  try {
    const { searchData, studyId } = req.query;

    if (!studyId) {
      return res.status(400).json({
        message: "studyId parameter is required",
      });
    }

    const filter = {
      studyNumber: studyId,
    };

    if (searchData) {
      filter[Op.or] = [
        { sampleSerial: { [Op.like]: `%${searchData}%` } },
        { patientName: { [Op.like]: `%${searchData}%` } },
        { mrn: { [Op.like]: `%${searchData}%` } },
        { ssn: { [Op.like]: `%${searchData}%` } },
      ];
    }
    const freezers = await Freezer.findAll({
      include: [
        {
          model: StorageBackUp,
          as: "samplesBackUp",
          where: filter,
          required: true,
        },
      ],
    });

    res.status(200).json({ freezers });
  } catch (error) {
    console.error("Error fetching samples backups:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = samplesBackups;
