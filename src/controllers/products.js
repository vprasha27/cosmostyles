const Product = require("../models/Product");
const express = require("express");
const { Op } = require("sequelize");
const uploadImage = require("../helpers/upload");
const router = express.Router();

//create a route named /product/add to add a new product
router.post("/product/add", async function (req, res) {
  try {
    const file = req.files;
    const image = await uploadImage({
      originalname: file.file.name,
      buffer: file.file.data,
    });

    console.log(image);

    req.body.image = image;
    const product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//create a route named /product/list to list all products
router.get("/product/list", async function (req, res) {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});

//create a route to delete a product
router.get("/product/delete/:id", async function (req, res) {
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send("Product deleted successfully");
  } catch (error) {
    res.send(error);
  }
});

//create a route to modify the product
router.post("/product/update/:id", async function (req, res) {
  try {
    const file = req.files;
    const image = await uploadImage({
      originalname: file.file.name,
      buffer: file.file.data,
    });

    console.log(image);

    req.body.image = image;

    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.send(product);
  } catch (error) {
    res.send(error);
  }
});

//create a route to update feature property
router.post("/product/update/feature/:id", async function (req, res) {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.send(product);
  } catch (error) {
    res.send(error);
  }
});

//create a router to get a product by id
router.get("/product/:id", async function (req, res) {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.send(product);
  } catch (error) {
    res.send(error);
  }
});

//get all products fro, array of ids
router.get("/products/:ids", async function (req, res) {
  try {
    const products = await Product.findAll({
      where: {
        id: {
          [Op.or]: req.params.ids.split(","),
        },
      },
    });
    return res.send(products);
  } catch (error) {
    res.send(error);
  }
});

//route to get products/feature
router.get("/products/feature/get", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        feature: 1,
      },
    });

    console.log("🚀 ~ file: products.js ~ line 107 ~ products", products);

    return res.send(products);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
