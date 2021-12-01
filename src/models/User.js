//crete  sequelize model that hs firstName, lastName, mobile, email, password, role, isActive, createdAt, updatedAt
const { DataTypes } = require("sequelize");
const database = require("../helpers/database");
const Password = require("../helpers/password");

var User = database.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  block: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prime: {
    type: DataTypes.INTEGER,
    allowNull: true,
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

User.sync({ alter: true }, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("User table created");
  }
});

module.exports = User;
