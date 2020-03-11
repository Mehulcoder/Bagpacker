var mongoose = require("mongoose");
// Schema setup
var campgroundSchema = new mongoose.Schema({
    Name: String,
    Image: String,
    Desc: String,
    Comments: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//Mongoose will automatically make the 'C' to 'c' //And the var below(Campground) will be used for create
//We now have the "campgrounds" collection in our database
module.exports = mongoose.model("Campground", campgroundSchema);