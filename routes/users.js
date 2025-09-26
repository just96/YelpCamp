// User routes
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const users = require("../controllers/users");

// Show register form and handle user registration
router.route("/register").get(users.renderRegister).post(catchAsync(users.register));

// Show login form and handle login
router
  .route("/login")
  .get(users.renderLogin)
  .post(storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login);

// Handle logout
router.get("/logout", users.logout);

// Export router
module.exports = router;
