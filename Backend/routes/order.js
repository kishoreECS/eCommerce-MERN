const express = require("express");
const {
  createOrder,
  getSingleOrder,
  getAllOrders,
  getAdminOrders,
  updateAdminOrder,
  deleteAdminOrder
} = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser,authorizeRoles } = require("../middlewares/authenticate");

router.post("/createOrder", isAuthenticatedUser, createOrder);
router.get("/Order/:id", isAuthenticatedUser, getSingleOrder);
router.get("/Orders", isAuthenticatedUser, getAllOrders);

// Admin
router.get("/admin/Orders", isAuthenticatedUser,authorizeRoles("admin"), getAdminOrders);
router.put("/admin/Orders/:id", isAuthenticatedUser,authorizeRoles("admin"), updateAdminOrder);
router.delete("/admin/Orders/:id", isAuthenticatedUser,authorizeRoles("admin"), deleteAdminOrder);


module.exports = router;
