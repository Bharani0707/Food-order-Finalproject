const express = require("express");
const {
  placeOrder,
  paymentVerify,
  userOrders,
  orderList,
  updateStatus,
} = require("../Controllers/OrderController.js");

const orderRouter = express.Router();
orderRouter.post("/checkout", placeOrder);
orderRouter.post("/paymentverify", paymentVerify);
orderRouter.post("/userorders", userOrders);
orderRouter.get("/list", orderList);
orderRouter.post("/status", updateStatus);

module.exports = orderRouter;
