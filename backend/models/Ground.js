const mongoose = require("mongoose");

const Ground = new mongoose.Schema(
  {
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

    image: {
      type: String,
       default:"https://raw.githubusercontent.com/CodeDushyant/ImagesForDemo/refs/heads/main/photo-1750716413756-b66624b64ce4.avif",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isBooked: {
      type: Boolean,
      default: false,
    },

    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    bookingDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Ground", Ground);
