const Freezer = require("../../models/freezer");
const getFreezers = async (req, res) => {
  try {
    const freezers = await Freezer.find();
    res.status(200).json({
      freezers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = getFreezers;
