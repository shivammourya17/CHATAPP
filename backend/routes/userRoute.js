const express = require("express");
const router = express.Router();
const {getUserBySearch,getCurrentChatters} = require("../controllers/UserHandler");
const { isLogin } = require("../middlewares/isLogin");

// Correct route definition
router.get("/search", isLogin, getUserBySearch);
router.get("/currentChatters",isLogin,getCurrentChatters);


module.exports = router;
