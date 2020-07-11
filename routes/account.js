const express = require(`express`);
const router = express.Router();
const User = require(`../models/User`);
const bcrypt = require(`bcryptjs`);
const passport = require(`passport`);

router.post(`/addUser`, (req, res) => {
  let user = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      User.create(user)
        .then((user) => {
          console.log("user added: " + user);
        })
        .catch((e) => {
          console.log("error:" + e);
        });
    });
  });

  res.render(`login/login`);
});

module.exports = router;
