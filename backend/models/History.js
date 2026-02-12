const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  mood: String,
  genres: [String],
  searchedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("History", historySchema);