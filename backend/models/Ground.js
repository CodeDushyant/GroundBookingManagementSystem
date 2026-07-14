const mongoose = require("mongoose");

const groundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  sportType: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Ground", groundSchema);
