const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  createNewBlog,
  updateText,
  deleteBlog,
  getAllUserBlogs,
  getLatestBlogs,
} = require("../controllers/blogController");

router.get("/", auth, getLatestBlogs);
router.get("/user-blogs", auth, getAllUserBlogs);
router.post("/", auth, createNewBlog);
router.put("/update", auth, updateText);
router.delete("/delete", auth, deleteBlog);

module.exports = router;
