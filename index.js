var express = require("express");
var app = express();

var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var session = require("express-session");
var csurf = require("csurf");
var localStrategy = require("passport-local").Strategy;

var configDB = require("./config/database");

User = require("./models/user");

mongoose.connect(configDB.url);


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({ secret: configDB.secret, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(csurf());

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use(express.static(__dirname + "/public"));

app.disable('x-powered-by');

var Router = require("./routes/routes.js")(passport);

app.use("/", Router);


//handle 404
app.use(function(req, res, next){
  res.status(404);
  if(req.accepts("html")){
    if(req.isAuthenticated()) res.render("404", {user: req.user, url: req.url});
    else res.render("404", {user: null, url: req.url });
    return;
  }
  if(req.accepts("json")){
    res.send({error: "404 not found"});
    return;
  }
  res.type("txt").send("404 not found");
});

//handle 500s
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  if(req.accepts("json")){
    res.send({error: "ERROR ~500" + err});
    return;
  }
  res.type("txt").send("500 error " + err);
});


if (!module.parent) {
  app.listen(3000);
  //console.log("\n\t\t\tapp running on port localhost:3000\n");
}
