// Users controllers
const User = require("../models/user");

// Show register form
module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

// Handle user registration
module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, function (err) {
      if (err) return next(err);
      req.flash("success", "Welcome to Yelp Camp!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

// Show login form
module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

// Handle login
module.exports.login = (req, res) => {
  req.flash("success", "welcome back!");
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

// Handle logout
module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};
