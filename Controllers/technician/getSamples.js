const Sample = require("../../models/sample");
const Study = require("../../models/study");
const Patient = require("../../models/patient");

const getSamples = async (req, res) => {
  try {
    const samples = await Sample.findAll({
      include: [
        {
          model: Study,
          required: true,
        },
        {
          model: Patient,
          required: true,
        },
      ],
    });

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
