const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/create", authController.createUser);
router.post("/login", authController.loginUser);
router.post("/loginAdmin", authController.loginAdmin);
router.get("/verify/:uniqueString", authController.verifyUser);
router.get("/current", authController.currentUser);
router.get("/logout", authController.logoutUser);
router.get("/getUsers", authController.getUsers);
router.post("/address", authController.createAddress);
router.post("/card", authController.createCard);
router.post("/delete", authController.deleteUser);

module.exports = router;
