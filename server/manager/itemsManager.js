const Article = require("../models/Article");
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

// exports.update = (articleId, articleData) =>
//   Article.findByIdAndUpdate(articleId, articleData);

// exports.delete = (articleId) => Article.findByIdAndDelete(articleId);
