const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase/dataBaceHandler");

const Storage = sequelize.define("storageBackUp", {
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
  studyNumber: { type: DataTypes.STRING },
  patientName: { type: DataTypes.STRING },
  mrn: { type: DataTypes.STRING },
  ssn: { type: DataTypes.STRING },
  birthDate: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING },
  sampleDrawing: { type: DataTypes.STRING },
  sampleSerial: { type: DataTypes.STRING },
  khccBioSampleCode: { type: DataTypes.STRING },
  cell: { type: DataTypes.STRING },
  mainBoxId: { type: DataTypes.STRING },
  subBoxId: { type: DataTypes.STRING },
  mainBoxType: { type: DataTypes.STRING },
  subBoxType: { type: DataTypes.STRING },
});

module.exports = Storage;
