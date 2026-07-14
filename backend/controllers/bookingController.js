const Booking = require("../models/Booking");
const Ground = require("../models/Ground");

// User Book Ground

exports.bookGround = async (req, res) => {
  try {
    const { userId, groundId, bookingDate } = req.body;

    // Find Ground

    const ground = await Ground.findById(groundId);

    if (!ground) {
      return res.status(404).json({
        message: "Ground not found",
      });
    }

    // Check already booked

    if (ground.isBooked) {
      return res.status(400).json({
        message: "Ground already booked",
      });
    }

    // Create Booking

    const booking = await Booking.create({
      user: userId,

      ground: groundId,

      bookingDate,
    });

    // Update Ground Status

    ground.isBooked = true;

    ground.bookedBy = userId;

    ground.bookingDate = bookingDate;

    await ground.save();

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
    }).populate("ground", "name location sportType price image");

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
        select: "name location price image",
      });

    // Remove other admin bookings

    const adminBookings = bookings.filter((booking) => booking.ground !== null);

    res.json(adminBookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
