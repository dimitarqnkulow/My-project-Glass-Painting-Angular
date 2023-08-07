const articleManager = require("../manager/itemsManager");
const { auth } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const article = await articleManager.getAll(req.query);

  res.json(article);
});
router.get("/trending", async (req, res) => {
  const article = await articleManager.getTrending();

  res.json(article);
});

router.get("/:userId/liked", async (req, res) => {
  const article = await articleManager.getLikedArts(req.params.userId);

  res.json(article);
});

router.post("/", auth, async (req, res) => {
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

router.post("/:articleId", auth, async (req, res) => {
  const userId = req.body.userId;

  await articleManager.addLike(req.params.articleId, userId);

  res.status(204).end();
});
router.put("/:articleId", auth, async (req, res) => {
  const userId = req.body.userId;

  await articleManager.removeLike(req.params.articleId, userId);

  res.status(204).end();
});
module.exports = router;
