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

// Add todo
router.post("/", auth, async (req, res) => {
  const { text } = req.body;
  try {
    const newTodo = new Todo({
      userId: req.user.id,
      text: text,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update todo
router.put("/:id", auth, async (req, res) => {
  const { text, completed } = req.body;
  try {
    const todo = await Todo.findById(req.params.id);
    console.log("Todo Found By Id", todo);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.userId.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized!" });
    todo.text = text ?? todo.text;
    todo.completed = completed ?? todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Delete a todo
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    if (todo.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Todo.findByIdAndDelete(todo.id);
    res.json({ msg: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
