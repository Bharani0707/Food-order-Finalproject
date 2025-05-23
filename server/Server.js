const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database.js");
const foodRouter = require("./Routes/Route.js");
const userRouter = require("./Routes/UserRoute.js");
const cartRouter = require("./Routes/CartRoute.js");
const orderRouter = require("./Routes/OrderRoute.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Static file serving for uploaded images
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "Uploads")));

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/food", foodRouter);     // Food add/list/remove
app.use("/api/user", userRouter);     // User register/login
app.use("/api/cart", cartRouter);     // Cart functionality
app.use("/api/order", orderRouter);   // Orders (place/list/update)

// Razorpay public key (if used for frontend payment integration)
app.get("/api/getkey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

// Basic health check route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
