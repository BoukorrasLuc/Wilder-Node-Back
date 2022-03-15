// Serve
const express = require("express");
const router = express.Router();

// Import the Wilder model
const Wilder = require("../models/Wilder");

// Route all Wilders
router.get("/api/wilder/read", async (req, res) => {
  try {
    const wilder = await Wilder.find();
    res.status(200).json(wilder);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log({ error: error.message });
  }
});

// Route Create
router.post("/api/wilder/create", async (req, res) => {
  try {
    const wilder = await Wilder.findOne({ name: req.body.name });

    if (!wilder) {
      const newWilder = new Wilder({
        name: req.body.name,
        city: req.body.city,
        skills: req.body.skills,
      });

      await newWilder.save();
      console.log(`New Wilder created: ${newWilder.name}`);
      res.status(201).json(newWilder);
    } else {
      return res.status(409).json({
        message: "An account already exists for this name.",
      });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Route Update
router.put("/api/wilder/update/:id", async (req, res) => {
  const options = { new: true };
  const modifyWilder = await Wilder.findByIdAndUpdate(
    req.params.id,
    req.body,
    options
  );
  res.status(200).json({ modifyWilder });
});

module.exports = router;
