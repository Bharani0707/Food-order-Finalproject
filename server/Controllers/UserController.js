

const userModel = require("../Models/UserModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Helper function to create JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// ------------------------
// 👤 Register User
// ------------------------
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
    }

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists!" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Create token
    const token = createToken(savedUser._id);

    // ✅ Return full user details (without password)
    res.status(200).json({
      success: true,
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// ------------------------
// 🔐 Login User
// ------------------------
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password." });
    }

    // Create token
    const token = createToken(user._id);

    // ✅ Return full user details (without password)
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { registerUser, loginUser };
