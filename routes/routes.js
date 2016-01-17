var express = require("express");
var router = express.Router();

router.get("/", function(req, resp){
  resp.render("homepage");
});

router.get("/contact", function(req, resp){
  resp.render("contact");
});
module.exports = router;
