const UserModel = require("../Models/UserModel.js");
const addToCart = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.body.itemId); // Fetch product details
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    console.log("Request body:", req.body);
    let userData = await UserModel.findById({ _id: req.body.userId });
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = (await userData.cartData) || {};
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = {
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.image,
      };
    } else {
      cartData[req.body.itemId].quantity += 1;
    }
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { cartData } },
      { new: true }
    );
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Adding To Cart" });
  }
};
const removeFromCart = async (req, res) => {
  try {
    let userData = await UserModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    if (cartData[req.body.itemId] === 0) {
      delete cartData[req.body.itemId];
    }
    await UserModel.findByIdAndUpdate(req.body.userId, { $set: { cartData } });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: "Error" });
  }
};
const getCart = async (req, res) => {
  try {
    const userData = await UserModel.findByIdAndUpdate(req.body.userId);
    const cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

module.exports = { addToCart, removeFromCart, getCart };
