const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignupForm) //signupform
  .post(wrapAsync(userController.signup)); //signupfunctionality

router
  .route("/login")
  .get(userController.renderLoginForm) //loginform
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login //login func
  );

router.get("/logout", userController.logout);
module.exports = router;
