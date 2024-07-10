const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
