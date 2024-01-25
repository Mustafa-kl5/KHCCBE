const generateLog = require("../../Utils/generateLog");
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
    const freezer = await Freezer.create({
      freezerName,
      freezerModel,
      freezerLocation,
      freezerType,
      NumberOfShelves,
      BoxesPerShelf,
    });

    generateLog(
      req.user.userId,
      `The employee with super admin privileges has been add new freezer the following with data \n Freezer Name:${freezerName} \n Freezer Model:${freezerModel} \n At this location:${freezerLocation} `
    );
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
