const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  console.log(req.header);
  const token = req.header("Authorization");
  console.log("TOKEN: ", token);
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });
  try {
    console.log("INSIDE MIDDLEWARE");
    const decoded = jwt.verify(token.split(" ")[1], jwtSecret);
    req.user = decoded;
    console.log("DECODED", decoded);
    next();
  } catch (e) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Get Todo
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (e) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
