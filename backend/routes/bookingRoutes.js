const router = require("express").Router();

const {
  bookGround,
  getUserBookings,
  getAdminBookings,
} = require("../controllers/bookingController");

router.post("/book", bookGround);

router.get("/user/:userId", getUserBookings);

router.get("/admin/:adminId", getAdminBookings);

module.exports = router;
