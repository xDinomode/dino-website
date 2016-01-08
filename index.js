var express = require("express");
var app = express();

var router = require("./routes/routes");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(__dirname + "/public"));

app.use("/", router);

app.use("*", router);

app.listen(3000);
