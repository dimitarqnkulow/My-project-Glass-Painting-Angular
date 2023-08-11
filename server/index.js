const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const app = express();
const PORT = 3030;

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
  res.setHeader("Access-Control-Allow-Headers", "*,Authorization");
  next();
});

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
