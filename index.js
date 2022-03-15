// Serve
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Models
const Wilder = require("./models/Wilder");

// Database
mongoose
  .connect(process.env.MONGODB_URI, {
    autoIndex: true,
  })
  .then(() => {
    return console.log("Connected to MongoDB database...");
  })
  .catch((err) => console.log("Could not connect", err));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Wilder API !" });
});

const wilderRoutes = require("./routes/wilder");
app.use(wilderRoutes);

// start
app.listen(process.env.PORT, () => console.log(`Server started`));
