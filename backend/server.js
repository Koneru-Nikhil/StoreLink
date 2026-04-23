require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const authRoutes = require("./routes/authRoutes");
/* ======================
   MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());

/* ======================
   DATABASE CONNECTION
====================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

/* ======================
   ROUTES
====================== */

// Home route
app.get("/", (req, res) => {
  res.send("KiranaConnect Backend Running");
});

// ✅ Product Routes (ADD THIS)
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/auth", authRoutes);
/* ======================
   SERVER START
====================== */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});