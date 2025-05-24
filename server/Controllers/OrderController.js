// ✅ Final Fixed Version of OrderController.js with Razorpay integration

const instance = require("../razorpayInstance.js");
const crypto = require("crypto");
require("dotenv").config();
const Payment = require("../Models/PaymentModel.js");
const orderModel = require("../Models/OrderModel.js");
const userModel = require("../Models/UserModel.js");
const jwt = require("jsonwebtoken");

// ------------------------
// 🧾 Place Order (creates Razorpay order)
// ------------------------
const placeOrder = async (req, res) => {
  const { userId, items, address, amount } = req.body;
  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: `order_rcptid_${new Date().getTime()}`,
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error placing Razorpay order:", error);
    res.status(500).json({ success: false, message: "Failed to create payment order" });
  }
};

// ------------------------
// ✅ Payment Verify
// ------------------------
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

  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      const newOrder = new orderModel({
        userId,
        items,
        address,
        amount,
        payment: true,
        status: "Food Processing",
        razorpay_order_id,
      });

      await newOrder.save();
      await Payment.create({ razorpay_order_id, razorpay_payment_id, razorpay_signature });

      return res.json({
        success: true,
        message: "Payment verified successfully",
        razorpay_payment_id,
      });
    } else {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ------------------------
// ✅ Get Orders for Logged In User (Token Based)
// ------------------------
const userOrders = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Authorization token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const orders = await orderModel.find({ userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this user" });
    }

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ------------------------
// 📋 Admin: Get All Orders
// ------------------------
const orderList = async (req, res) => {
  try {
    const orders = await orderModel.find({}).lean();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// ------------------------
// 🔄 Admin: Update Order Status
// ------------------------
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.status(200).json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};

module.exports = {
  placeOrder,
  paymentVerify,
  userOrders,
  orderList,
  updateStatus,
};
