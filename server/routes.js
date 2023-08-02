const router = require("express").Router();
const userController = require("./controllers/userController");
const itemsController = require("./controllers/itemsController");
const ordersController = require("./controllers/ordersController");
router.use("/users", userController);
router.use("/data/items", itemsController);
router.use("/orders", ordersController);
module.exports = router;
