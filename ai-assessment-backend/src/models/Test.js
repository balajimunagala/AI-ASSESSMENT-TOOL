const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: String,
  question: String,
  difficulty: String,
  starterCode: String,
  createdBy: String,
  timeLimit: Number,
});

module.exports = mongoose.model("Test", testSchema);