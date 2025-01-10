require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY; // replace it with process.env.SECRET_KEY
exports.signup = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, userType });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Check if email and userType exist in the request body
    if (!email || !password || !userType) {
      return res.status(400).send("Email, password, and userType are required");
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("Invalid email, password or section");

    // Check if the userType from the request matches the userType in the database
    if (user.userType !== userType) {
      //Check userType 
      return res.status(400).send("Invalid email, password or section");
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid email, password or section");

    // Generate a JWT token for the user with user id and userType
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Send the token back as response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
