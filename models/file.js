const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase/DataBaseHandler");

const File = sequelize.define("File", {
  filename: {
    type: DataTypes.STRING,
  },
});
module.exports = File;
