var express = require("express");
var router = express.Router();

router.get("/", function(req, resp){
  resp.render("homepage");
});
router.get("/tutorials/node/1", function(req, resp){
  resp.render("node");
});
router.get("/contact", function(req, resp){
  resp.render("contact");
});
module.exports = router;
