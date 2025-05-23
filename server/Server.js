const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database.js");
const foodRouter = require("./Routes/Route.js");
const userRouter = require("./Routes/UserRoute.js");
const cartRouter = require("./Routes/CartRoute.js");
const orderRouter = require("./Routes/OrderRoute.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT|| 5001;
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Database connection
connectDB();

//API endpoints
app.use("/api/food", foodRouter);
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "Uploads")));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.get("/api/getkey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
