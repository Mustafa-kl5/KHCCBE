const Sample = require("../../models/sample");
const getSamples = async (req, res) => {
  try {
    const samples = await Sample.find()
      .populate("studyNumber")
      .populate("patient");
    //   .populate("author");
    res.status(200).json({
      samples,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = getSamples;
