const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase/dataBaceHandler");

const Freezer = sequelize.define("Freezer", {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
  freezerName: {
    type: DataTypes.STRING,
  },
  freezerModel: {
    type: DataTypes.STRING,
  },
  freezerLocation: {
    type: DataTypes.STRING,
  },
  freezerType: {
    type: DataTypes.STRING,
  },
  NumberOfShelves: {
    type: DataTypes.INTEGER,
  },
  BoxesPerShelf: {
    type: DataTypes.INTEGER,
  },
  capacity: {
    type: DataTypes.INTEGER,
    defaultValue: 50000,
  },
});

module.exports = Freezer;
