const router = require("express").Router();

const {
  getUser,
  createUser,
  deleteUser,
  login,
} = require("../controllers/userController");

router.get("/", getUser);
router.post("/", createUser);
router.post("/login", login);
router.delete("/", deleteUser);

module.exports = router;
