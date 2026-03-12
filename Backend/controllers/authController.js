const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utilis/errorHandler");
const sendToken = require("../utilis/jwt");
const sendEmail = require("../utilis/email");

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

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.isValidPassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res
    .cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

//Get User Profile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Changed Password
exports.changePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatched = await user.isValidPassword(req.body.oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = req.body.password;

  await user.save();

  sendToken(user, 200, res);
});

// Update Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

// Admin Get All Users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Admin Users By Id
exports.getUserById = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404),
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});
// Admin Udate User
exports.updateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

// Admin Delete User
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404),
    );
  }
  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// exports.forgotPassword = catchAsyncError(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return next(new ErrorHandler("User not found with this email", 404));
//   }
//   const resetToken = user.getResetToken();
//   await user.save({ validateBeforeSave: false });

//   // Create reset URL
//   const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

//   const message = `Your password reset token is: \n\n ${resetUrl} \n\n If you have not requested this email, please ignore it.`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: "Password Reset Token",
//       message,
//     })

//     res.status(200).json({
//       success: true,
//       message: `Email sent to ${user.email} successfully`,
//     })
//   } catch (error) {
//     user.resetPasswordToken = undefined;
//     user.resetPasswordTokenExpire = undefined;
//     await user.save({ validateBeforeSave: false });
//     return next(new ErrorHandler(error.message, 500));
//   }
// });
