const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Database Connection

connectDB();

app.use(cors());

app.use(express.json());

// Routes

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/grounds", require("./routes/groundRoutes"));

app.use("/api/bookings", require("./routes/bookingRoutes"));

app.get("/", (req, res) => {
  res.send("Ground Management Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
