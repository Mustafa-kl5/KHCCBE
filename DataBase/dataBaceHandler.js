const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("KHCC", "SA", "P@ssword1234", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
});

module.exports = sequelize;
