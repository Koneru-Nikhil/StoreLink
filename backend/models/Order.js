const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  customerName: String,

  address: String,

  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],

  totalAmount: Number,

  status: {
    type: String,
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Order", orderSchema);