//create a sequelize model with fields id, jobName, description

const { DataTypes } = require("sequelize");
const database = require("../helpers/database");

var Order = database.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  products: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  card: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  payment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  payment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "IN PROGRESS",
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

Order.sync({ alter: true }, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Order table created");
  }
});

module.exports = Order;
