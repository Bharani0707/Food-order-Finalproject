const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://bharanikumar843:Spiral%40123@cluster0.ammbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection error:", err));
};
module.exports = { connectDB };
