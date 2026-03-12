const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../controllers/authController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
// router.post("/password/forgot", forgotPassword);
router.put("/password/change", isAuthenticatedUser, changePassword);
router.put("/update/profile", isAuthenticatedUser, updateProfile);

router.get("/myprofile", isAuthenticatedUser, getUserProfile);

// Admin Routes
router.get("/admin/user",isAuthenticatedUser,authorizeRoles("admin"), getAllUsers);
router.get("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"), getUserById);
router.put("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"), updateUser);
router.delete("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"), deleteUser);

module.exports = router;
