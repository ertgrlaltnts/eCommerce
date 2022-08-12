const express = require("express");
const categoryController = require("../controllers/categoryController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();

router.post(
  "/create",
  roleMiddleware("admin"),
  categoryController.createCategory
);

router.get("/:slug", categoryController.getProductsWithCategory);
router.put(
  "/:slug",
  roleMiddleware("admin"),
  categoryController.updateCategory
);
router.delete(
  "/:slug",
  roleMiddleware("admin"),
  categoryController.deleteCategory
);

module.exports = router;
