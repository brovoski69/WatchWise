const express = require("express");
const Favourite = require("../models/Favourite");

const router = express.Router();

// Save Favourite
router.post("/", async (req, res) => {
  try {
    const favourite = await Favourite.create(req.body);
    res.json(favourite);
  } catch (error) {
    res.status(500).json({ message: "Error saving favourite" });
  }
});

// Get All Favourites
router.get("/", async (req, res) => {
  const favourites = await Favourite.find().sort({ savedAt: -1 });
  res.json(favourites);
});

module.exports = router;