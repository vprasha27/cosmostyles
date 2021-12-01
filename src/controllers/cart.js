const express = require("express");

const verifyToken = require("../middleware/verify");
const Product = require("../models");
const Cart = require("../models/Cart");
const router = express.Router();

//create router named /cart/add to add propduct to cart
router.post("/cart/add", verifyToken, async (req, res) => {
  try {
    req.body.userId = req.id;

    await Cart.create(req.body);
    res.send("Product added to cart");
  } catch (error) {
    return res.status(400).send(error);
  }
});

//create router named /cart/get to get all products in cart
router.get("/cart/get", verifyToken, async (req, res) => {
  const id = req.id;
  try {
    const data = await Cart.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: Product,
          as: "product",
        },
      ],
    });

    res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

router.post("/cart/update/:id", async (req, res) => {
  try {
    await Cart.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send("Product added to cart");
  } catch (error) {
    return res.status(400).send(error);
  }
});

//delete cart item
router.post("/cart/delete/:id", verifyToken, async (req, res) => {
  try {
    Cart.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Product deleted from cart");
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
