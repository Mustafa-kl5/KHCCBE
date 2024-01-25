const { DataTypes } = require('sequelize');
const Study = require("./study");
const sequelize = require("../DataBase/dataBaceHandler");
const Patient = sequelize.define('patients', {
   _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
  patientName: { type: DataTypes.STRING },
  ssn: { type: DataTypes.STRING },
  mrn: { type: DataTypes.STRING },
  dayCode: { type: DataTypes.STRING },
  researchId: { type: DataTypes.STRING },
  birthDate: { type: DataTypes.STRING },
  admitionRecDate: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING },
  sampleDrawing: { type: DataTypes.STRING },
  seen: { type: DataTypes.BOOLEAN, defaultValue: false },
  seenBy: { type: DataTypes.STRING, defaultValue: 'unseen yet' },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  deleteReason: { type: DataTypes.STRING, defaultValue: '' },
  createAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
Patient.belongsTo(Study)

module.exports = Patient;
