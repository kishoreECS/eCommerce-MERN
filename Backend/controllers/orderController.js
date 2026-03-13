const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utilis/errorHandler");
const Order = require("../models/orderModels");
const User = require("../models/userModel");
const Product = require("../models/productModels");

// Get All Orders
exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200 || 201).json({
    success: true,
    order,
  });
});

// Get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id:${req.params.id}`, 404),
    );
  }
  res.status(200).json({
    success: true,
    order,
  });
});

// Get All Orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get All Orders from Admin
exports.getAdminOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Admin Order Status Updated
exports.updateAdminOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  for (const item of order.orderItems) {
    await updateStock(item.product, item.quantity);
  }

  // FIX HERE
  order.orderStatus = req.body.orderStatus;

  if (req.body.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);

  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

// Admin Delete Order
exports.deleteAdminOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id:${req.params.id}`, 404),
    );
  }

  await order.deleteOne();
  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
