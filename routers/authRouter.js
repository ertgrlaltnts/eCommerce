const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/create", authController.createUser);
router.post("/login", authController.loginUser);
router.get("/verify/:uniqueString", authController.verifyUser);
router.get("/current", authController.currentUser);
router.get("/logout", authController.logoutUser);

module.exports = router;
