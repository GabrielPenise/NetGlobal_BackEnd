const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME || "net_security",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "postgre",
  {
    host: process.env.SERVER_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "postgres",
    port: 5432,
    logging: false,
  }
);

module.exports = db;
