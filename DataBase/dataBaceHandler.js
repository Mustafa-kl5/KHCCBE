const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("KHCCBIO", "SA", "Mustafa_5137745", {
  host: "localhost",
  dialect: "mssql",
  define: {
    freezeTableName: true,
  },
});

module.exports = sequelize;
