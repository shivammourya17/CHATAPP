const express = require("express");
const router = express.Router();
const {sendMessage, getMessage} = require("../controllers/messagecontroller");
const { isLogin } = require("../middlewares/isLogin");

// Correct route definition
router.post("/send/:id", isLogin, sendMessage);
router.get("/:id",getMessage)

module.exports = router;
