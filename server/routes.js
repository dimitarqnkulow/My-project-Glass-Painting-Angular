const router = require("express").Router();
const userController = require("./controllers/userController");
const itemsController = require("./controllers/itemsController");

router.use("/users", userController);
router.use("/data/items", itemsController);

module.exports = router;
