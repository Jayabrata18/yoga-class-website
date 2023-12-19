const express = require("express");
const { body } = require("express-validator");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const jwtKey = process.env.JWT_KEY || "default_secret_key";
// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://jayabrata180402:mIeSKTNHEkXVOrmu@cluster0.exbvmaz.mongodb.net/?retryWrites=true&w=majority"
  )
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
  updatedAt: Date,
  slot: Number,
});

const User = mongoose.model("User", userSchema);

// const router = express.Router();
app.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    // body("name"),
    // body("age"),
    // body("sex"),
  ],
  async (req, res) => {
    const { email, password, name, age, sex, slot } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("Email in use");
    }

    const newUser = new User({
      email,
      password,
      name,
      age,
      sex,
      updatedAt: new Date(),
      slot,
    });
    await newUser.save();

    res.status(201).send(newUser);
  }
);

app.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password cannot be empty"),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser || existingUser.password !== password) {
      return res.status(401).send("Invalid credentials");
    }
    const { slot } = existingUser;
    res.status(200).json({ success: true, message: "Login successful", slot });

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      jwtKey
    );

    // Store it on the session object or in a cookie
    req.session = {
      jwt: userJwt,
    };
    console.log(req.session);

    // res.status(200).send(existingUser);
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
