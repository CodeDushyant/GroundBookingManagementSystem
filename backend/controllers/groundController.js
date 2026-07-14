const Ground = require("../models/Ground");

// Admin Add Ground

exports.addGround = async (req, res) => {
  try {
    const { name, location, sportType, price, owner, image } = req.body;

    const ground = await Ground.create({
      name,
      location,
      sportType,
      price,
      owner,

      // if admin provides image use it else default image
      image:
        image ||
        "https://raw.githubusercontent.com/CodeDushyant/ImagesForDemo/refs/heads/main/photo-1750716413756-b66624b64ce4.avif",
    });

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
    const ground = await Ground.findByIdAndDelete(req.params.id);

    if (!ground) {
      return res.status(404).json({
        message: "Ground not found",
      });
    }

    res.json({
      message: "Ground Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAdminGrounds = async (req, res) => {
  try {
    const { adminId } = req.params;

    // Security check: Ensure the request params match the logged-in user
    // (Optional: Depends if you are using middleware to protect this route)

    const grounds = await Ground.find({ owner: adminId });

    if (!grounds) {
      return res
        .status(404)
        .json({ message: "No grounds found for this admin." });
    }

    res.status(200).json(grounds);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAdminGrounds };
