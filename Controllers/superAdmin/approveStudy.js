const generateLog = require("../../Utils/generateLog");
const Study = require("../../models/study");
const approveStudy = async (req, res) => {
  const { studyId } = req.body;
  try {
    await Study.update({ isApproved: true }, { where: { _id: studyId } });
    const study = await Study.findOne({ where: { _id: studyId } });
    generateLog(
      req.user.userId,
      `The employee with super admin privileges has been approve study with this data Study Name : ${study.studyName} ,Study Number : ${study.studyNumber}`
    );
    res.status(200).json({
      message: `${study.studyName} is Approved Successfully`,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = approveStudy;
