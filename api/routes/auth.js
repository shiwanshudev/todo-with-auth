const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const auth = (req, res, next) => {
  console.log(req.header);
  const token = req.header("Authorization");
  console.log("TOKEN: ", token);
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });
  try {
    console.log("INSIDE MIDDLEWARE");
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    console.log("DECODED", decoded);
    next();
  } catch (e) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({
      username,
    });
    if (existingUser) {
      console.log("Found the user!", existingUser);
      return res.status(400, "Username already exists!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token });
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // isMatch is false
      return res.status(400).json({ message: "Invalid username or password!" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/user", auth, async (req, res) => {
  try {
    // The user is already added to req.user by the auth middleware
    console.log("DECODE TOKEN", req.user);
    return res.json(req.user);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
