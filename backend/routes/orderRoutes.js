const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


// ✅ Place Order (Customer)
router.post("/place", async (req, res) => {

  try {

    const order = await Order.create(req.body);

    res.json({
      message: "Order placed successfully",
      order
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});


// ✅ Get All Orders (Admin)
router.get("/", async (req, res) => {

  const orders = await Order.find();

  res.json(orders);

});
// ✅ Update order status
router.put("/update/:id", async (req, res) => {

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});
router.post("/place", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;