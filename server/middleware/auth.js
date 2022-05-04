const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token || token === undefined) {
    res.json({ msg: "Authorization failed." });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.json({ msg: "Forbidden." });
      }

      req.user = { id: user.id };
    });

    next();
  }
};
