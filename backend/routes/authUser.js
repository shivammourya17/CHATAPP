const express = require("express");
const router = express.Router();
const { UserRegister ,UserLogin, UserLogout} = require("../controllers/UserRegister");

// Correct route definition
router.post("/register", UserRegister);
router.post("/login",UserLogin);
router.post("/logout",UserLogout)

module.exports = router;
