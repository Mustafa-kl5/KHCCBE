const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase/dataBaceHandler");
const Storage = require("./storage");
const StorageBackUp = require("./storageBackUp");
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
Freezer.hasMany(Storage, { as: "samples" });
Storage.belongsTo(Freezer);
Freezer.hasMany(StorageBackUp, { as: "samplesBackUp" });
StorageBackUp.belongsTo(Freezer);
module.exports = Freezer;
