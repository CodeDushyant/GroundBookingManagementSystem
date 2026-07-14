const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/userController");

// Register User/Admin

router.post("/register", register);

// Login User/Admin

router.post("/login", login);

module.exports = router;
