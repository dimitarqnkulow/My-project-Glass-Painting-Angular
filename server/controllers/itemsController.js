const articleManager = require("../manager/itemsManager");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const article = await articleManager.getAll(req.query);

  res.json(article);
});

router.post("/", async (req, res) => {
  try {
    await articleManager.create({ ...req.body });

    res.status(204).end();
  } catch (error) {
    console.log(req.user);
    console.log(error);
    res.status(400).json({
      message: "Cannot create article",
    });
  }
});

router.get("/:articleId", async (req, res) => {
  const article = await articleManager.getOne(req.params.articleId);

  res.json(article);
});

// router.put("/:articleId", async (req, res) => {
//   await articleManager.update(req.params.articleId, req.body);

//   res.status(204).end();
// });

// router.delete("/:articleId", async (req, res) => {
//   await articleManager.delete(req.params.articleId);

//   res.status(204).end();
// });
module.exports = router;
