var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  url: String,
  commentbody: String,
  //replies: [commentSchema],
  //upvotes:{type: Number},
  username: String,
  created_by: {type: Schema.Types.ObjectId, ref: "Uzers"},
}, {
  timestamps: {createdAt: "created_at"}
});

var userSchema = new Schema({
  username: {type: String, minlength: 1, maxlength: 25, required: true, unique: true},
  password: {type: String, required: true},
}, {
  timestamps: {createdAt: "created_at"}
});


exports.Comments = mongoose.model("Comments", commentSchema);

exports.Users = mongoose.model("Uzers", userSchema);
