const Product = require("../models/product.js");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const ApiFeatures = require("../utils/apiFeatures");

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 8;
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const productsCount = await Product.countDocuments();

  const products = await apiFeatures.query;
  if (products.length === 0)
    return next(new ErrorHandler("Product not found", 404));
  res.status(200).json({
    success: true,
    count: products.length,
    productsCount,
    products,
    //:[{name:products.map(el=>el.name)
    // ,price:products.map(el=>el.price)}]
  });
});
exports.newProducts = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(203).json({ success: true, product });
});

exports.getOneProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  } else res.status(200).json({ success: true, product });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (product) {
    res.status(200).json({
      success: true,
      product,
    });
  }
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  if (product)
    res.status(200).send({ message: "Product deleted successfully", product });
});

exports.updateReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = await product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
        console.log(review);
      }
      console.log(review);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
    console.log;
  }
  product.ratings =
    product.reviews.reduce((acc, item) => {
      item.rating + acc, 0;
    }) / product.reviews.length;
  //Zero is the initial value
  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

exports.allReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  const allReviews = product.reviews;
  res.status(200).json({ success: true, count: allReviews.length, allReviews });
});
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  // console.log(product);
  const revs = product.reviews.filter((rev) => rev._id !== req.query.id);
  // const ratings = product.reviews.reduce((acc,item) =>{item.rating+acc,0})/revs.length;
  const ratings = 3;
  const numOfReviews = revs.length;
  console.log(ratings, numOfReviews);
  const upProduct = await Product.findByIdAndUpdate(
    req.query.productId,
    {
      revs,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  upProduct.save();
  res.status(200).json({ success: true, revs });
});
