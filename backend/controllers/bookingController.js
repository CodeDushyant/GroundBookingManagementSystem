const Booking = require("../models/Booking");

// User Book Ground

exports.bookGround = async (req, res) => {
  try {
    const booking = await Booking.create({
      user: req.body.userId,

      ground: req.body.groundId,

      bookingDate: req.body.bookingDate,
    });

    res.status(201).json({
      message: "Ground Booked Successfully",

      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// User See Own Booking

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.params.userId,
    }).populate("ground");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin See Booking Of His Ground

exports.getAdminBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate({
        path: "ground",
        match: {
          owner: req.params.adminId,
        },
        select: "name location price",
      });

    // remove bookings of other admins

    const adminBookings = bookings.filter((booking) => booking.ground !== null);

    res.json(adminBookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
