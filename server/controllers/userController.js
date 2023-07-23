const userManager = require("../manager/userManager");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    const result = await userManager.register(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await userManager.login(req.body);

    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.get("/logout", async (req, res) => {
  res.end();
});
module.exports = router;
