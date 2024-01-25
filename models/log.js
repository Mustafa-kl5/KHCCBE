const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase/dataBaceHandler");

const Log = sequelize.define("Log", {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  createAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Log;
