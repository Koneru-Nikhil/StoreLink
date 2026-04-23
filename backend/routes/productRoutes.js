const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//////////////////////////////////////////////////////////////////////////////////////
// ✅ ADD PRODUCT
//////////////////////////////////////////////////////////////////////////////////////
router.post("/add", async (req, res) => {
  try {
    const { name, price, category, stock, image } = req.body;

    const product = new Product({
      name,
      price,
      category,
      stock,
      image
    });

    await product.save();
    res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//////////////////////////////////////////////////////////////////////////////////////
// ✅ GET ALL PRODUCTS
//////////////////////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//////////////////////////////////////////////////////////////////////////////////////
// ✅ UPDATE PRODUCT
//////////////////////////////////////////////////////////////////////////////////////
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated data
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//////////////////////////////////////////////////////////////////////////////////////
// ✅ DELETE PRODUCT
//////////////////////////////////////////////////////////////////////////////////////
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;