const express = require("express");
const History = require("../models/History");

const router = express.Router();

router.get("/", async (req, res) => {
  const history = await History.find().sort({ searchedAt: -1 });
  res.json(history);
});

module.exports = router;