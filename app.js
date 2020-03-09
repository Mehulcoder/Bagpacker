var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Connect mongoose
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Schema setup
var campgroundSchema = new mongoose.Schema({
    Name: String,
    Image: String
});

//Mongoose will automatically make the 'C' to 'c' //And the var below(Campground) will be used for create
//We now have the "campgrounds" collection in our database
var Campground  = mongoose.model("Campground", campgroundSchema);

//Adding the first element
//We will use all the functions like-->Campground.function()
// console.log(Campground);---->model{ Campground }


// Tell our code that the css file and JS file will be included in the public folder


app.get("/", function (req, res) {
    res.render("landing");  
});

app.get("/campgrounds", function (req, res) {
        //Get all the campgrounds from the database and call it allcampgrounds
        Campground.find({}, function (err, allcampgrounds) {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds", {campgrounds:allcampgrounds});
            //Pass allcampgrounds fetced as campgrounds to the render
        }
     });
});



app.post("/campgrounds", function (req, res) {
    //Get data from form and add it to campgrounds array
    //Redirect back to campgrounds list page

    var name = req.body.name;
    var url = req.body.image;
    var newcampground = {Name:name, Image:url};

    Campground.create(newcampground, function (err, newcamp) { 
        if(err){
            console.log(err);
        }else{
            console.log("New Campground added");
            console.log(newcamp);
        }
     });

    res.redirect("/campgrounds");

});

app.get("/campgrounds/new", function (req, res) { 
    //This is the place to fill the form
    res.render("new");
 });

app.listen(3000, function () {  
    console.log("Project works fine");
});