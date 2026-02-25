const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utilis/errorHandler");
const sendToken = require("../utilis/jwt");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // Find User in DB
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  if (!await user.isValidPassword(password)) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 201, res);
});

// exports.logoutUser = catchAsyncError(async (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     message: "User logged out successfully",
//   });
// });

// exports.forgotPassword = catchAsyncError(async (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     message: "Password reset link sent to email",
//   });
// });

// exports.resetPassword = catchAsyncError(async (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     message: "Password reset successfully",
//   });
// });

// exports.getUserProfile = catchAsyncError(async (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     message: "User profile retrieved successfully",
//   });
// });
