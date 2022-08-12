const express = require("express");
const orderController = require("../controllers/orderController");
const verifyMiddleware = require("../middlewares/verifyMiddleware");
const router = express.Router();

router.post("/create", verifyMiddleware.isVerify, orderController.createOrder);

module.exports = router;
