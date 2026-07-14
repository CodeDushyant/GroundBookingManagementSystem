const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register User/Admin

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,

      email,

      password: hashPassword,

      role,
    });

    res.status(201).json({
      message: "User Created",

      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Simple Login Without JWT

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Wrong Password",
      });
    }

    res.json({
      message: "Login Success",

      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
