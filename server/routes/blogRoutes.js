const router = require("express").Router();

const {
  createNewBlog,
  updateText,
  deleteBlog,
  getAllUserBlogs,
  getLatestBlogs,
} = require("../controllers/blogController");

router.get("/", getLatestBlogs);
router.get("/user-blogs", getAllUserBlogs);
router.post("/", createNewBlog);
router.put("/update", updateText);
router.delete("/delete", deleteBlog);

module.exports = router;
