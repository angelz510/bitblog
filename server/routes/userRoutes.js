const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  getUser,
  createUser,
  deleteUser,
  login,
} = require("../controllers/userController");

router.get("/", auth, getUser);
router.post("/", createUser);
router.post("/login", login);
router.delete("/", auth, deleteUser);

module.exports = router;
