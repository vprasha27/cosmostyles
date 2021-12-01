//create a sequelize model which has fields id, description, price, image, name

const database = require("../helpers/database");
const Sequelize = require("sequelize");

const Product = database.define("product", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  feature: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

Product.sync({ alter: true }, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("User table created");
  }
});

module.exports = Product;
