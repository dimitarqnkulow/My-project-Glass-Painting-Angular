const Article = require("../models/Article");
const User = require("../models/User");
const { where } = require("../models/User");

exports.create = (articleData) => {
  Article.create(articleData);
};

exports.getAll = async (qs) => {
  let query = Article.find();
  if (qs.where) {
    let [fieldName, ownerId] = qs.where.split("=");
    ownerId = ownerId.replaceAll('"', "");
    query = query.find({ ownerId: ownerId });
  }
  const result = await query;

  return result;
};

exports.getOne = (articleId) => Article.findById(articleId);

exports.getTrending = () => {
  return Article.find().sort({ likes: "desc" }).limit(3);
};

exports.getLikedArts = (userId) => {
  return Article.find({ likes: {$in: userId} });
};
exports.addLike = async (articleId, userId) => {
  const article = await Article.findById(articleId);
  article.likes.push(userId);
  article.save();
};

exports.removeLike = async (articleId, userId) => {
  const article = await Article.findById(articleId);
  article.likes.pull(userId);
  article.save();
};
// exports.delete = (articleId) => Article.findByIdAndDelete(articleId);
