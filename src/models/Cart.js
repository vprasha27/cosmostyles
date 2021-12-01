//create a sequelize model with fields id, jobName, description

const { DataTypes } = require("sequelize");
const Product = require(".");
const database = require("../helpers/database");

var Cart = database.define("carts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Cart.sync({ alter: true }, (err, result) => {
  if (err) {
    console.log(err);
  } else {

   
    
    console.log("User table created");
  }
});

//create a hasone relationship with product

Cart.hasOne(Product, {
  foreignKey: "id",
  sourceKey: "productId",
});
module.exports = Cart;
