const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, ValidateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index)) //index route
  .post(
    isLoggedIn,
    ValidateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.CreateListing) //create route
  );

//new route(new listing route)
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListng)) //show route(view particular listing)
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    ValidateListing,
    wrapAsync(listingController.updateListings) //update route
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); //delete route

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
