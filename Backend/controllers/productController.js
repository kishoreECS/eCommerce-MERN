const Product = require("../models/productModels");
const ErrorHandler = require("../utilis/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utilis/apiFeatures");

// Get All products
exports.getProducts = async (req, res, next) => {
  const perPage = 2;
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(perPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

// Product Create
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get By ID
exports.getById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found test", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new ErrorHandler("Product not found test", 404));
    }

    next(error);
  }
};

// Update Product
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).json({
    success: true,
    product: updatedProduct,
  });
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne(); // ✅ FIX HERE

    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }
};

// Create Review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const review = {
    user: req.user.id,
    name: req.user.name, // required by schema
    rating: Number(rating),
    comment,
  };

  // Check if user already reviewed
  const isReviewed = product.reviews.find(
    (r) => r.user && r.user.toString() === req.user.id.toString(),
  );

  if (isReviewed) {
    // Update review
    product.reviews.forEach((r) => {
      if (r.user && r.user.toString() === req.user.id.toString()) {
        r.rating = Number(rating);
        r.comment = comment;
      }
    });
  } else {
    // Add new review
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  // Calculate average rating
  const totalRating = product.reviews.reduce((acc, item) => {
    return acc + Number(item.rating);
  }, 0);

  product.ratings = product.reviews.length
    ? totalRating / product.reviews.length
    : 0;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews of a product with param id
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  const reviews = product.reviews.filter((review) => {
    review._id.toString() !== req.query.id.toString();
  });

  const numberOfReviews = reviews.length;
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;

  ratings = isNaN(ratings) ? 0 : ratings;

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numberOfReviews,
  });

  res.status(200).json({
    success: true,
  });
});
