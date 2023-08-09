const userManager = require("../manager/userManager");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    const result = await userManager.register(req.body);
    res.status(201).json({ message: "User created", result: result });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const logingUser = await userManager.login(req.body);
    const token = logingUser.token;
    const userId = logingUser.userId;
    const email = logingUser.email;

    return res.status(200).json({ token: token, userId: userId, email: email });
  } catch (err) {
    res.status(401).json({
      message: `${err.message}`,
    });
  }
});

router.get("/logout", async (req, res) => {
  res.end();
});
module.exports = router;
