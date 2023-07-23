// const jwt = require("jsonwebtoken");

// exports.auth = (req, res, next) => {
//   const token = req.header("X-Authorization");

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, "BIGGESTSECRET");
//       req.user = decoded;
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Unauthorized" });
//     }
//   } else {
//     next();
//   }
// };
