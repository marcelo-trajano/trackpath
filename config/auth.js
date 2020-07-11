//import localStrategy from `passport-local`;
const localStrategy = require(`passport-local`).Strategy;
const bcrypt = require(`bcryptjs`);
const User = require(`../models/User`);

module.exports = (passport) => {
  passport.use(
    new localStrategy({ usernameField: `email` }, (email, password, done) => {
      User.findByEmail(email)
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "account not found" });
          }

          bcrypt.compare(password, user.password, (err, samePsw) => {
            if (samePsw) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password" });
            }
          });
        })
        .catch(() => {});
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => {
        done(null, user);
      })
      .catch((e) => {
        console.log("err: " + e);
      });
  });
};
