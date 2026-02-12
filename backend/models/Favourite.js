const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  movieId: Number,
  title: String,
  posterPath: String,
  genre: String,
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Favourite", favouriteSchema);