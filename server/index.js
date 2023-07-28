const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const { auth } = require("./middlewares/authMiddleware");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/glass-painting")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use(auth);
app.use(routes);

app.listen(3030, () =>
  console.log("RESTful server is listening on port 3030...")
);
