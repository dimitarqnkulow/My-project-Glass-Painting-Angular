const Article = require("../models/Article");
const User = require("../models/User");
const { where } = require("../models/User");

exports.create = (articleData) => {
  Article.create(articleData);
};

exports.getAll = async (qs) => {
  let filteredArticles = await Article.find().lean();
  if (qs) {
    filteredArticles = filteredArticles.filter((article) =>
      article.name.toLowerCase().includes(qs.search.toLowerCase())
    );
  }
  const result = await filteredArticles;

  return result;
};

exports.getOne = (articleId) => Article.findById(articleId);

exports.getTrending = () => {
  return Article.find().sort({ likes: "desc" }).limit(3);
};

exports.getLikedArts = (userId) => {
  return Article.find({ likes: { $in: userId } });
};
exports.addLike = async (articleId, userId) => {
  const article = await Article.findById(articleId);
  article.likes.push(userId);
  article.save();
  return article.likes.length;
};

exports.removeLike = async (articleId, userId) => {
  const article = await Article.findById(articleId);
  article.likes.pull(userId);
  article.save();
  return article.likes.length;
};
