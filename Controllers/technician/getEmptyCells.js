const Storage = require("../../models/storage");

const getEmptyCells = async (req, res) => {
  const { freezerId, mainBoxType, subBoxType, mainBoxId, subBoxId } = req.query;
  try {
    const cells = [];
    const samples = await Storage.findAll({
      where: {
        FreezerId: freezerId,
        mainBoxType: mainBoxType,
        subBoxType: subBoxType,
        mainBoxId: mainBoxId,
        subBoxId: subBoxId,
      },
    });
    samples.forEach((sample) => {
      cells.push(sample.cell);
    });
    res.status(200).json({
      cells,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = getEmptyCells;
