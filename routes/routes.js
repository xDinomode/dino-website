var express = require("express");
var router = express.Router();

router.get("/", function(req, resp){
  resp.render("homepage");
});
router.get("/tutorials/node/:number", function(req, resp){
  switch(req.params.number){
    case("1"):
    resp.render("./node/node1");
    break;
    case("2"):
    resp.render("./node/node2");
    break;
    default:
    resp.redirect("/");
  }
});
router.get("/contact", function(req, resp){
  resp.render("contact");
});
module.exports = router;
