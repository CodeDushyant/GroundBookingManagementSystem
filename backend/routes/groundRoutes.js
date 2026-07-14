const router = require("express").Router();

const {
  addGround,
  getAllGrounds,
  deleteGround,
} = require("../controllers/groundController");

router.post("/add", addGround);

router.get("/", getAllGrounds);

router.delete("/:id", deleteGround);
router.get("/admin/:adminId", getAdminGrounds);

module.exports = router;
