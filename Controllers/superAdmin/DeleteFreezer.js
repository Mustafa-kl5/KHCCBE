const generateLog = require("../../Utils/generateLog");
const Freezer = require("../../models/freezer");

const DeleteFreezer = async (req, res) => {
  const { Id } = req.body;
  try {
    const deletedFreezer = await Freezer.findOne({ where: { _id: Id } });
    await deletedFreezer.destroy();
    generateLog(
      req.user.userId,
      `The employee with super admin privileges has been delete freezer with following data \n Freezer Name:${deletedFreezer.freezerName} \n Freezer Model:${deletedFreezer.freezerName} \n At this location:${deletedFreezer.freezerLocation} `
    );
    res.status(200).json({
      message: `${deletedFreezer.freezerName} deleted successfully!`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = DeleteFreezer;
