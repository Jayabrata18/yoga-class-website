const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1.37017/mydatabase")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

// Define User schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  confirmPassword: String,
  name: String,
  age: String,
  sex: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ email, password });
    newUser.save((err) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(200).json({ message: "User registered successfully" });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find the user
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ email }, "secretkey");

    res.status(200).json({ token });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
