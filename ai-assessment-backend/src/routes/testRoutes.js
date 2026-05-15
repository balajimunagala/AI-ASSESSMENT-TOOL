const express = require("express");
const router = express.Router();
const {
  createTest,
  getTest,
  submitCode,
  getLeaderboard,
} = require("../controllers/testController");
const Test = require("../models/Test");

router.post("/tests/create", createTest);
router.get("/tests/:id", getTest);
router.post("/submissions", submitCode);
router.get("/leaderboard/:testId", getLeaderboard);
router.get("/tests", async (req, res) => {
    const tests = await Test.find();
    res.json(tests);
  });

module.exports = router;