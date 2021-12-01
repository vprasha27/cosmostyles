//create a class to create a sequelize database connection to my sql

const Sequelize = require("sequelize");

const database = new Sequelize(
  "commerce",
  "my",
  "12345",
  {
    host: "192.168.64.2",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    sync: { alter: true },
    underscored: true,
  }
);

module.exports = database;
