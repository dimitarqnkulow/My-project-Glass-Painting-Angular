const jwt = require("../lib/jwt");
const { SECRET } = require("../configuration/config");

exports.auth = (req, res, next) => {
  const token = req.header("X-Authorization");

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    next();
  }
};
