const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js"); //try catch error handling
const Review = require("../models/review.js");
const {
  ValidateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/review.js");
//review post route
router.post(
  "/",
  isLoggedIn,
  ValidateReview, //middlware for validation on server side for form of review
  wrapAsync(reviewController.createReview)
);

//delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);
module.exports = router;
