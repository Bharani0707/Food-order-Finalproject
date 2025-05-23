const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: [itemSchema], required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
  razorpay_order_id: { type: String, required: true },
});
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
module.exports = orderModel;
