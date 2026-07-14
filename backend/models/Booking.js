const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    ground: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ground",
    },

    bookingDate: {
      type: Date,
    },

    status: {
      type: String,
      default: "confirmed",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
