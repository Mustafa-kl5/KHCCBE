const Freezer = require("../../models/freezer");
const addFreezer = async (req, res) => {
  const {
    freezerName,
    freezerModel,
    freezerLocation,
    freezerType,
    NumberOfShelves,
    BoxesPerShelf,
  } = req.body;
  try {
    const freezer = new Freezer({
      freezerName,
      freezerModel,
      freezerLocation,
      freezerType,
      NumberOfShelves,
      BoxesPerShelf,
    });
    await freezer.save();
    res.status(201).json({
      message: `${freezerName} freezer added successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = addFreezer;
