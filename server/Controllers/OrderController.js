const instance = require("../razorpayInstance.js");
const crypto = require("crypto");
require("dotenv").config();
const Payment = require("../Models/PaymentModel.js");
const orderModel = require("../Models/OrderModel.js");
const userModel = require("../Models/UserModel.js");
const jwt = require("jsonwebtoken");
const placeOrder = async (req, res) => {
  const { userId, items, address, amount } = req.body;
  const options = {
    amount: Number(amount * 100),
    currency: "INR",
    receipt: `order_rcptid_${new Date().getTime()}`,
  };

  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order: order,
  });
};
const paymentVerify = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    items,
    address,
    amount,
  } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");
  console.log("razorpay_order_id:", razorpay_order_id);
  console.log("razorpay_payment_id:", razorpay_payment_id);
  console.log("razorpay_signature:", razorpay_signature);
  console.log("Generated signature:", generated_signature);

  if (generated_signature == razorpay_signature) {
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      payment: true,
      status: "Food Processing",
      razorpay_order_id: razorpay_order_id,
    });
    await newOrder.save();
    await orderModel.updateOne(
      { razorpay_order_id },
      { $set: { payment: true } }
    );
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    return res.json({
      success: true,
      message: "Payment verified successfully",
      razorpay_payment_id,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
const userOrders = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    const userId = decoded.id;
    console.log("Fetching orders for userId:", userId);
    const orders = await orderModel.find({ userId });
    console.log("Orders fetched:", orders);
    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//Display orders in Admin panel
const orderList = async (req, res) => {
  try {
    const orders = await orderModel.find({}).lean();
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ sucess: true, message: "Status Updated" });
  } catch (error) {
    cosnole.log(error);
    res.json({ suceess: false, message: "Failed to update status" });
  }
};
module.exports = {
  placeOrder,
  paymentVerify,
  userOrders,
  orderList,
  updateStatus,
};
