const mongoose = require("mongoose");
const User = require("./User");

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  material: { type: String, required: true },
  crafting: { type: Number, required: true },
  likes: [{ type: mongoose.Types.ObjectId, ref: User }],
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
