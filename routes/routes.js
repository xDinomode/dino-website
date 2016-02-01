var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt-nodejs");

module.exports = function(passport){

  router.get("/", function(req, res){
    if(req.isAuthenticated()){
      res.render("homepage", {user: req.user});
    } else{
      res.render("homepage", {user: null});
    }
  });

  router.get("/login", function(req, res){
    if(req.isAuthenticated()) res.render("/");
    res.render("login", {message : req.flash("loginMessage"), csrf: req.csrfToken() });
  });
  router.post("/login", passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
  }));

  router.get("/signup", function(req, res){
    // res.render("signup", {message: req.flash("signupMessage")});
    if(req.isAuthenticated()) res.redirect("/");
    res.render("signup", {message: req.flash("signupMessage"), csrf: req.csrfToken() });
  });
  router.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
  }));

  router.post("/comment", isLoggedIn, function(req, res){
    User.Users.findById(req.user._id, function(err, user){
      if(err) return console.log(err);
      var comment = new User.Comments({
        url: req.body.path,
        username: req.user.username,
        commentbody: req.body.textarea,
        created_by: user._id
      });

      comment.save(function(err){
        if(!err){
          User.Comments.findOne({created_by: req.user._id})
            .populate("created_by")
            .exec(function(err, comment){
              res.redirect("/tutorials/node/1");
            });
        }
      });
    });

  });

  router.get("/path", function(req, res){
    User.Comments.find({url: "/tutorials/node/1"}, function(err, comments){
      if(err) console.log(err);
      res.send(comments);
    });
  });
  router.get("/my", function(req, res){
    User.Comments.find({created_by: req.user._id}, function(err, comments){
      if(err) console.log(err);
      res.send(comments);
    });
  });

  router.get("/profile", isLoggedIn, function(req, res){
    res.render("profile", {user: req.user});
  });

  router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

  router.get("/contact", function(req, res){
    if(req.isAuthenticated()) res.render("contact", {user: req.user});
    else res.render("contact", {user: null});
  });

  router.get("/comments", function(req, res){
    User.Comments.find({}, function(err, comments){
      if(!err){
        res.send(comments);
      }
    });
  });

  router.get("/tutorials/node/:number", function(req, res){
    switch(req.params.number){
      case("1"):
      User.Comments.find({url: "/tutorials/node/1"})
        .populate({
          path: "created_by",
          options: {limit: 5}
        })
        .exec(function(err, data){
          if(req.isAuthenticated()) res.render("./node/node1", {user: req.user, csrf: req.csrfToken(), comments: data});
          else res.render("./node/node1", {user: req.user, csrf: req.csrfToken(), comments: data});
        });
      // if(req.isAuthenticated()) res.render("./node/node1", {user: req.user, csrf: req.csrfToken()});
      // else res.render("./node/node1", {user: null, csrf: req.csrfToken()});
      break;
      case("2"):
      User.Comments.find({url: "/tutorials/node/2"})
        .populate({
          path: "created_by",
          options: {limit: 5}
        })
        .exec(function(err, data){
          if(req.isAuthenticated()) res.render("./node/node2", {user: req.user, csrf: req.csrfToken(), comments: data});
          else res.render("./node/node2", {user: req.user, csrf: req.csrfToken(), comments: data});
        });
      // if(req.isAuthenticated()) res.render("./node/node2", {user: req.user});
      // else res.render("./node/node2", {user: null});
      break;
      default:
      if(req.isAuthenticated()) res.render("404", {user: req.user, url: req.url});
      else res.render("404", {user: null, url: req.url });
      break;
    }
  });

  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/");
  }

  return router;
};
