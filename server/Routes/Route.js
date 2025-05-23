const express = require("express");
const {
  addFoodItem,
  displayList,
  removeFoodItems,
} = require("../Controllers/FoodController.js");
const multer = require("multer");

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: "./Uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()} ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post(
  "/add",
  upload.single("image"),
  (req, res, next) => {
    console.log("Request body:", req.body);
    console.log("File uploaded:", req.file);
    next();
  },
  addFoodItem
);
foodRouter.get("/list", displayList);
foodRouter.post("/remove", removeFoodItems);

module.exports = foodRouter;
