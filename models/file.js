const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase/dataBaceHandler");

const File = sequelize.define("File", {
  filename: {
    type: DataTypes.STRING,
  },
});

module.exports = File;
