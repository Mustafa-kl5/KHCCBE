const Freezer = require("../../models/freezer");

const DeleteFreezer = async (req, res) => {
  const { Id } = req.body;
  try {
    const deletedFreezer = await Freezer.findByIdAndDelete({ _id: Id });
    res.status(200).json({
      message: `${deletedFreezer.freezerName} deleted successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = DeleteFreezer;
