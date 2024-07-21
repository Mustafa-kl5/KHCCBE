const { DataTypes } = require("sequelize");
const Study = require("./study");
const Patient = require("./patient");
const sequelize = require("../DataBase/DataBaseHandler");

const Sample = sequelize.define("samples", {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
  storageType: { type: DataTypes.STRING },
  containerType: { type: DataTypes.STRING },
  sampleType: { type: DataTypes.STRING },
  drawnAt: { type: DataTypes.STRING },
  numberOfSamples: { type: DataTypes.STRING },
  sampleSerial: { type: DataTypes.STRING },
  rejectReason: { type: DataTypes.STRING, defaultValue: "" },
  khccBioSampleCode: { type: DataTypes.STRING, defaultValue: "" },
  isRejected: { type: DataTypes.BOOLEAN, defaultValue: false },
  isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
  isStored: { type: DataTypes.BOOLEAN, defaultValue: false },
  createAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});
Sample.belongsTo(Study);
Sample.belongsTo(Patient);

module.exports = Sample;
