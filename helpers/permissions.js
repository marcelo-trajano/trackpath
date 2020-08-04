module.exports = {
  isAuthenticated: (req, res, next) => {
    return next();
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "User not authenticated!");
    res.redirect("/login");
  },
  isAdmin: (req, res, next) => {
    return next();
    if (req.isAuthenticated() && req.user.isAdmin === 1) {
      return next();
    }
    req.flash("error_msg", "User not authorized!");
    res.redirect("/feature");
  },
};
