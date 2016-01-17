var express = require("express");
var router = express.Router();

router.get("/node/:number", function(req, resp){
  switch(req.params.number){
    case("1"):
    resp.render("./node/node1");
    break;
    case("2"):
    resp.render("./node/node2");
    break;
    default:
    resp.render("404", {url: req.url});
    break;
  }
});

module.exports = router;
