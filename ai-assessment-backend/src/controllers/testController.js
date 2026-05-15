const Test = require("../models/Test");
const Submission = require("../models/Submission");

exports.createTest = async (req, res) => {
  const test = await Test.create(req.body);
  res.json(test);
};

exports.getTest = async (req, res) => {
  const test = await Test.findById(req.params.id);
  res.json(test);
};

exports.submitCode = async (req, res) => {
  const score = Math.floor(Math.random() * 20) + 80;

  const submission = await Submission.create({
    userId: req.body.userId,
    name: req.body.name,          // ✅ NEW
    testId: req.body.testId,
    code: req.body.code,
    score,
    timeTaken: req.body.timeTaken // ✅ NEW
  });

  res.json(submission);
};

exports.getLeaderboard = async (req, res) => {
  const submissions = await Submission.find({
    testId: req.params.testId,
  }).sort({ score: -1 });

  res.json(submissions);
};