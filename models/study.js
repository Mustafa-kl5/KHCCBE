const { DataTypes } = require("sequelize");
const File = require("./file");
const sequelize = require("../DataBase/dataBaceHandler");
sequelize;
const Study = sequelize.define("Study", {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
  studyName: {
    type: DataTypes.STRING,
  },
  piName: {
    type: DataTypes.STRING,
  },
  studyNumber: {
    type: DataTypes.STRING,
  },
  studyKeywords: {
    type: DataTypes.STRING,
  },
  studyInitDate: {
    type: DataTypes.STRING,
  },
  closeData: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  isClosed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Study.hasMany(File, { as: "files" });
File.belongsTo(Study);

module.exports = Study;
