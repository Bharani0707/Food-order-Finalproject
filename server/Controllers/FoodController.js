const foodModel = require("../Models/DBmodel.js");
const fs = require("fs");

const addFoodItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    // Create a new food item
    const newFoodItem = new foodModel({
      name,
      description,
      price: Number(price),
      category,
      image: req.file.path,
    });
    //Save into DB
    await newFoodItem.save();
    res.status(201).json({ message: "Food item added successfully!" });
  } catch (error) {
    console.error("Error saving food item:", error);
    res.status(500).json({ message: "Error adding food item" });
  }
};
//Display food list
const displayList = async (req, res) => {
  try {
    const foodItems = await foodModel.find({});
    res.json({ success: true, data: foodItems });
  } catch (err) {
    console.log(err);
  }
};
//Remove item from DB
const removeFoodItems = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`Uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing items" });
  }
};

module.exports = { addFoodItem, displayList, removeFoodItems };
