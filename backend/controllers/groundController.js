const Ground = require("../models/Ground");

// Admin Add Ground

exports.addGround = async (req, res) => {
  try {
    const ground = await Ground.create(req.body);

    res.status(201).json({
      message: "Ground Added Successfully",
      ground,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Grounds (User)

exports.getAllGrounds = async (req, res) => {
  try {
    const grounds = await Ground.find().populate("owner", "name email");

    res.status(200).json(grounds);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Ground (Admin)

exports.deleteGround = async (req, res) => {
  try {
    await Ground.findByIdAndDelete(req.params.id);

    res.json({
      message: "Ground Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
