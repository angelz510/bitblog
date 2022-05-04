const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (err) {
      res.json({ msg: err });
    }
  },
  createUser: async (req, res) => {
    if (!req.body.userName) return res.json({ msg: "no userName key present" });
    if (!req.body.email) return res.json({ msg: "no email key present" });
    if (!req.body.password) return res.json({ msg: "no password key present" });

    try {
      const userExists = await User.findOne({ email: req.body.email });

      if (userExists)
        return res.json({ msg: "User with this email already exists" });

      const salt = await bcrypt.genSalt();
      const hashedPW = await bcrypt.hash(req.body.password, salt);

      const newUser = await new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPW,
      }).save();

      res.json(newUser);
    } catch (err) {
      res.json({ msg: err });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.find({ email: req.body.email });

      const isMatch = await bcrypt.compare(req.body.password, user[0].password);
      console.log(user[0] !== null && isMatch)
      if (user[0] !== null && isMatch) {
        const token = await jwt.sign(
          { id: user[0]._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );

        res.json({
          _id: user[0]._id,
          userName: user[0].userName,
          email: user[0].email,
          token: token,
        });
      } else {
        throw new Error("No user found with that info.");
      }
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (isMatch) {
        const deleteResponse = await User.findByIdAndDelete(req.user.id);
        if (deleteResponse !== null) {
          //await Blog.deleteMany({ authorID: { $eq: req.user.id } });

          return res.json({ msg: "success" });
        }
        return res.sendStatus(403);
      } else {
        return res.sendStatus(401);
      }
    } catch (err) {
      res.json({ msg: err });
    }
  },
};
