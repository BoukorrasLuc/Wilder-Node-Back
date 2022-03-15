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
    const wilder = await Wilder.findOne({ name: req.fields.name });

    if (!wilder) {
      // if (req.fields.city && req.fields.skills) {
      const newWilder = new Wilder({
        name: req.fields.name,
        city: req.fields.city,
        skills: req.fields.skills,
      });

      await newWilder.save();
      console.log(`New Wilder created: ${newWilder.name}`);
      res.status(201).json(newWilder);
      console.log("newWilder", newWilder);
      // }
      // else {
      //   return res.status(400).json({ message: "Missing parameters" });
      // }
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
  //   const wilderModify = await Wilder.findByIdAndUpdate(req.params.id);
  //   try {
  //     if (req.fields.name) {
  //       wilderModify.name = req.fields.name;
  //     }
  //     if (req.fields.city) {
  //       wilderModify.city = req.fields.city;
  //     }
  //     if (req.fields.skills) {
  //       for (let i = 0; i < req.fields.skills.length; i++) {
  //         wilderModify.skills[i].title = req.fields.skills[i].title;
  //         wilderModify.skills[i].votes = req.fields.skills[i].votes;
  //       }
  //     }
  //     await wilderModify.save();
  //     res.status(201).json("Wilder modified succesfully !");
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // });
  // // Route delete
  // router.delete("/api/wilder/delete/:id", async (req, res) => {
  //   try {
  //     await Wilder.deleteOne({ _id: req.params.id });
  //     res.json({ message: "Wilder deleted succesfully !" });
  //   } catch (error) {
  //     res.status(404).json({ error: error.message });
  //   }
});

module.exports = router;
