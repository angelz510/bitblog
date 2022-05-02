const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  subject: String,
  text: String,
  userName: String,
  createdAt: String,
  authorID: String,
});

module.exports = Blog = mongoose.model("Blog", blogSchema);
