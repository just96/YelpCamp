// Campground routes
const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// Show all campgrounds and create new campground
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, validateCampground, upload.array("image"), catchAsync(campgrounds.createCampground));

// Form to create new campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

// Show single campground with reviews,  Update campground and Delete campground
router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, isAuthor, validateCampground, upload.array("image"), catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// Form to edit campground
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// Export router
module.exports = router;
