var express = require("express");
var app = express();

var router = require("./routes/routes");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(__dirname + "/public"));

app.use("/", router);

//handle 404
app.use(function(req, res, next){
  res.status(404);
  if(req.accepts("html")){
    res.render("404", { url: req.url });
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

app.listen(3000);

console.log("\n\t\t\tapp running on port localhost:3000\n");
