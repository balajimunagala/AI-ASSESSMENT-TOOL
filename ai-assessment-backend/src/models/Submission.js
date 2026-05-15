const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: String,
  name: String,        // ✅ NEW
  testId: String,
  code: String,
  score: Number,
  timeTaken: Number,   // ✅ NEW
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Submission", submissionSchema);