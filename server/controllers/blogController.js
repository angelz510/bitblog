const Blog = require("../models/blogModel");

module.exports = {
  getLatestBlogs: async (req, res) => {
    try {
      const myBlogs = await Blog.find().sort({ _id: -1 }).limit(10);
      res.json(myBlogs);
    } catch (err) {
      res.json({ msg: err });
    }
  },
  getAllUserBlogs: async (req, res) => {
    try {
      const myBlogs = await Blog.find({ authorID: req.user.id });
      res.json(myBlogs);
    } catch (err) {
      res.json({ msg: err });
    }
  },

  createNewBlog: async (req, res) => {
    try {
      const newBlog = new Blog({
        subject: req.body.subject,
        text: req.body.text,
        userName: req.body.userName,
        createdAt: req.body.createdAt,
        authorID: req.user.id,
      });
      res.json(await newBlog.save());
    } catch (err) {
      res.json({ msg: err });
    }
  },

  updateText: async (req, res) => {
    try {
      const updateResponse = await Blog.findByIdAndUpdate(req.body.blogID, {
        subject: req.body.subject,
        text: req.body.text,
      });

      if (updateResponse !== null) return res.json({ msg: "success" });
      res.json({ msg: "wrong id sent" });
    } catch (err) {
      res.json({ msg: err });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const deleteResponse = await Blog.findByIdAndDelete(req.body.blogID);

      if (deleteResponse !== null) return res.json({ msg: "success" });
      res.json({ msg: "wrong id sent" });
    } catch (err) {
      res.json({ msg: err });
    }
  },
};
