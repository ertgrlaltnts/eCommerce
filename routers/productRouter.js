const express = require("express");
const productController = require("../controllers/productController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();

router.post("/create", productController.createProduct);
router.get("/", productController.getAllProduct);
router.get("/:slug", productController.getProduct);
router.delete("/:slug", productController.deleteProduct);
router.put("/:slug", productController.updateProduct);

module.exports = router;
