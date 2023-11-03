const express = require("express");
const itemsRouter = require("./items");
const usersRouter = require("./users");

const router = express.Router();

router.use("/items", itemsRouter);
router.use("/users", usersRouter);

module.exports = router;
