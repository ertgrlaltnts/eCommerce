const express = require("express");
const productController = require("../controllers/productController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();

router.post(
  "/create",
  roleMiddleware("admin"),
  productController.createProduct
);
router.get("/", productController.getAllProduct);
router.get("/:slug", productController.getProduct);
router.delete(
  "/:slug",
  roleMiddleware("admin"),
  productController.deleteProduct
);
router.put("/:slug", roleMiddleware("admin"), productController.updateProduct);

module.exports = router;
