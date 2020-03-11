var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    content:String,
    author:String
});

module.exports = mongoose.model("Comment", commentSchema);