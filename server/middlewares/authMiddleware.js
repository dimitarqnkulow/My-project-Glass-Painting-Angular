const jwt = require("../lib/jwt");
const { SECRET } = require("../configuration/config");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const isAuth = await jwt.verify(token, SECRET);

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
