const mongoose = require("mongoose");

const Wilder = mongoose.model("Wilder", {
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }],
});

module.exports = Wilder;
