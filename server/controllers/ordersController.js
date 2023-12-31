const router = require("express").Router();
const ordersManager = require("../manager/ordersManager");
const { auth } = require("../middlewares/authMiddleware");

router.post("/", auth, async (req, res) => {
  try {
    const result = await ordersManager.order(req.body);
    res.status(201).json({ message: "Order created", result: result });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});
module.exports = router;
