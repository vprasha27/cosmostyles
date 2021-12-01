const express = require("express");
const verifyToken = require("../middleware/verify");
const Address = require("../models/Address");
const router = express.Router();

//create a route to add user address
router.post("/address/add", verifyToken, async (req, res) => {
  try {
    req.body.userId = req.id;
    console.log(req.body);
    //check if address already exists
    const address = await Address.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    console.log(
      "🚀 ~ file: address.js ~ line 15 ~ router.post ~ address",
      address
    );

    if (!address) {
      const data = await Address.create(req.body);
      return res.send(data);
    } else {
      return res.send(address);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

//get all user addresses
router.get("/address/get", verifyToken, async (req, res) => {
  try {
    const data = await Address.findOne({
      where: {
        userId: req.id,
      },
    });
    res.send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
