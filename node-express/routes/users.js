const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { generateToken } = require("../utils/token");

// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("phoneNumber _id");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

// Route for user signup or login
router.post("/signup", async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = new User({ phoneNumber });
      await user.save();
    }

    const token = generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

module.exports = router;
