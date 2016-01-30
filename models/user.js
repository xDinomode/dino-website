var mongoose = require("mongoose");


var commentSchema = mongoose.Schema({
  commentbody: String,
  created_by: {type: mongoose.Schema.Types.ObjectId, ref: "Uzers"}
});

var userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  comments: [commentSchema]
}, {
  timestamps: {createdAt: "created_at"}
});


exports.Comments = mongoose.model("Comments", commentSchema);

exports.Users = mongoose.model("Uzers", userSchema);
