const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("khcc", "SA", "P@ssword1234", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  define: {
    freezeTableName: true,
  },
});

module.exports = sequelize;
