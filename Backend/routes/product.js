const express = require("express");
const {
  getProducts,
  createProduct,
  getById,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

router.get("/products", isAuthenticatedUser, getProducts);
router.get("/product/:id", isAuthenticatedUser, getById);
router.put("/productUpdate/:id", isAuthenticatedUser, updateProduct);
router.delete("/productDelete/:id", isAuthenticatedUser, deleteProduct);

router.put("/review", isAuthenticatedUser, createProductReview);
router.get("/reviews", isAuthenticatedUser, getProductReviews);
router.delete("/review", isAuthenticatedUser, deleteReview);

// Admin Routes
router.post(
  "/admin/productCreate",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct,
);

module.exports = router;
