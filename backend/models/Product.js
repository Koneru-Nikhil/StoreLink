const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  stock: Number,
  image: String // ✅ NEW FIELD
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);