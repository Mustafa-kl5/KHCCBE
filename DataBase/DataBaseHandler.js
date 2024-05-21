const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const env = process.env.NODE_ENV || "local";
dotenv.config({ path: `.env.${env}` });

let dbName, dbUser, dbPassword, dbHost, dbDialect;
if (process.env.NODE_ENV === "production") {
  dbName = process.env.PROD_DB_NAME;
  dbUser = process.env.PROD_DB_USER;
  dbPassword = process.env.PROD_DB_PASSWORD;
  dbHost = process.env.PROD_DB_HOST;
  dbDialect = process.env.PROD_DB_DIALECT;
} else {
  dbName = process.env.LOCAL_DB_NAME;
  dbUser = process.env.LOCAL_DB_USER;
  dbPassword = process.env.LOCAL_DB_PASSWORD;
  dbHost = process.env.LOCAL_DB_HOST;
  dbDialect = process.env.LOCAL_DB_DIALECT;
}
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  define: {
    freezeTableName: true,
  },
});

module.exports = sequelize;
