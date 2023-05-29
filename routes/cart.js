const router = require("express").Router();
const Cart = require("../models/Cart");

router.post("/cart", async (req, res) => {
  const cartProductId = req.body._id;
  try {
    const saveProduct = await newProduct.save();
    res.status(200).send({ message: "Product has been created!", saveProduct });
  } catch (error) {
    res.status(500).json({ error, message: "Product has not been created!" });
  }
});

module.exports = router;