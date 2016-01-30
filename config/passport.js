var localStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(passport){
  passport.serializeUser(function(user, done){
      done(null, user.id);
  });
  passport.deserializeUser(function(id, done){
      User.Users.findById(id, function(err, user){
          done(err, user);
      });
  });

  passport.use("local-signup", new localStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
  }, function(req, username, password, done ){
      User.Users.findOne({username: username}, function(err, user){
          if(err) return done(err);

          if(user){
            return done(null, false, req.flash("signupMessage", "Username already taken"));
          } else{
              bcrypt.hash(password, null, null, function(err, hash){
                if(err) console.log(err);
                  var newUser = new User.Users({
                      username: username,
                      password: hash
                  });
                  new newUser.save(function(err){
                    if(err) console.log(err);
                    return done(null, newUser);
                  });
              });
          }
      });
  }));


  passport.use("local-login", new localStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, function(req, username, password, done){
    User.Users.findOne({username: username}, function(err, user){
      if(err) return done(err);

      if(!user){
        return done(null, false, req.flash("login-message", "No user found"));
      } else{
        bcrypt.compare(password, user.password, function(err, check){
          if(check){
            return done(null, user);
          } else{
            return done(null, false, req.flash("login-message", "Try again"));
          }
        });
      }

});
}));
};
