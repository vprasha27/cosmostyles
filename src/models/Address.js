//create a sequelize model with fields id, jobName, description

const { DataTypes } = require("sequelize");
const database = require("../helpers/database");

var Address = database.define("address", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  street: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  city: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  province: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pincode: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  country: {
    type: DataTypes.TEXT,
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

Address.sync({ alter: true }, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Addtess table created");
  }
});

module.exports = Address;
