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

//GET TRENDING
router.get(
  "/trending",
  (req, res, next) => {
    try {
      const token = req.headers.authorization;
      jwt.verify(token, SECRET);
      next();
    } catch (err) {
      res.status(401).json({
        message: "Error with Authentication token",
      });
    }
  },
  async (req, res) => {
    const article = await articleManager.getAll();

    res.json(article);
  }
);
// router.put("/:articleId", async (req, res) => {
//   await articleManager.update(req.params.articleId, req.body);

//   res.status(204).end();
// });

// router.delete("/:articleId", async (req, res) => {
//   await articleManager.delete(req.params.articleId);

//   res.status(204).end();
// });
module.exports = router;
