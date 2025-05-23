const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../Controllers/CartController.js");
const authMiddleware = require("../Middlewares/auth.js");

const cartRouter = express.Router();
cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);

module.exports = cartRouter;
