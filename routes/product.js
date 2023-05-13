const router = require("express").Router();
const Product = require('../models/Product')

//create a product
router.post('/', async (req,res)=> {
    const newProduct = new Product(req.body)
    try {
        const saveProduct = await newProduct.save();
        res
          .status(200)
          .send({ message: "Product has been created!", saveProduct });
    } catch (error) {
        res.status(500).json({error, message: "Product has not been created!"});
    }
});

// update product
router.put('/:id', async (req,res)=> {
    try {
        const product = await Product.findById(req.params.id);
        if (product.userId === req.body.userId) {
            await product.updateOne({ $set: req.body });
            res.status(200).json("Your product has been updated");
        }else {
            res.status(403).json("You can update only your product");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// // delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.userId === req.body.userId) {
      await product.deleteOne();
      res.status(200).json("Your product has been deleted");
    } else {
      res.status(403).json("You can delete only your product");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// // get product
router.get("/", async(req,res)=> {
     try {
       const product = await Product.aggregate([{$sample: {
         size: 60
       }}]);
       res.setHeader("Access-Control-Allow-Origin", "*");
       res.setHeader("Access-Control-Allow-Methods", "GET");
       res.setHeader(
         "Access-Control-Allow-Headers",
         "Origin, X-Requested-With, Content-Type, Accept"
       );
       res.status(200).json(product);
     } catch (err) {
       console.error(err.message);
       res.status(500).send("Server Error");
     }
});

module.exports = router;