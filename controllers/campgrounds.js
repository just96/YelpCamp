// Campground controllers
const Campground = require("../models/campground");
const cloudinary = require("cloudinary").v2;
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

// Show all campgrounds
module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

// Form to create new campground
module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

// Create new campground
module.exports.createCampground = async (req, res) => {
  const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
  // console.log(geoData);
  if (!geoData.features?.length) {
    req.flash("error", "Could not geocode that location. Please try again and enter a valid location.");
    return res.redirect("/campgrounds/new");
  }
  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.features[0].geometry;
  campground.location = geoData.features[0].place_name;

  campground.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  campground.author = req.user._id;
  await campground.save();
  console.log(campground);
  req.flash("success", "Successfully made a new campground!");
  res.redirect(`/campgrounds/${campground._id}`);
};

// Show single campground with reviews
module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

// Form to edit campground
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground });
};

// Update campground
module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;

  const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
  console.log(geoData);
  if (!geoData.features?.length) {
    req.flash("error", "Could not geocode that location. Please try again and enter a valid location.");
    return res.redirect(`/campgrounds/${id}/edit`);
  }
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });

  campground.geometry = geoData.features[0].geometry;
  campground.location = geoData.features[0].place_name;

  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  campground.images.push(...imgs);
  await campground.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    console.log(campground);
  }
  req.flash("success", "Successfully updated campground!");
  res.redirect(`/campgrounds/${campground._id}`);
};

// Delete campground
module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted campground!");
  res.redirect("/campgrounds");
};
