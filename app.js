var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//requiring seedsDB
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

// Connect mongoose
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

seedDB();

// Start routing
app.get("/", function (req, res) {
    res.render("landing");  
});

// INDEX----->Show all campgrounds
app.get("/index", function (req, res) {
        //Get all the campgrounds from the database and call it allcampgrounds
        Campground.find({}, function (err, allcampgrounds) {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:allcampgrounds});
            //Pass allcampgrounds fetched as campgrounds to the render
        }
     });
});


 // CREATE-----> add new campground
 app.post("/index", function (req, res) {
    //Get data from form and add it to campgrounds array
    //Redirect back to campgrounds list page

    var name = req.body.name;
    var url = req.body.image;
    var desc = req.body.desc;
    var newcampground = {Name:name, Image:url, Desc:desc};

    Campground.create(newcampground, function (err, newcamp) { 
        if(err){
            console.log(err);
        }else{
            console.log("New Campground added");
            console.log(newcamp);
        }
    });

    res.redirect("/index");

});


// NEW------->Show form to create new campground
app.get("/index/new", function (req, res) { 
    //This is the place to fill the form
    res.render("campgrounds/new");
 });


//SHOW -- show more information for the perticular id
 app.get("/index/:id", function (req, res) {
     Campground.findById(req.params.id).populate("Comments").exec(function (err, foundCampground) { 
         if(err){
             console.log(err);
         }else{
             console.log(foundCampground);
            res.render("campgrounds/show", {campground:foundCampground});
         }
      });
 });

 // ==============
// Comments Routes
// ==============

app.get("/index/:id/comments/new", function (req, res) { 
    Campground.findById(req.params.id, function (err, campground) { 
        if (err) {
            console.log(err);
        }else{
            res.render("comments/new", {campground:campground});
        }
     });
 });

 app.post("/index/:id/comments", function (req, res) { 
   
    console.log(req.params.id);
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log("Could not find the ID");
            console.log(err);
            console.log(req.body.comment);
            res.redirect("/index");
        }else{
            Comment.create(req.body.comment,function (err, comment) { 
                if (err) {
                    console.log("Comment waala error");
                    console.log(err);
                    req.redirect("/index");
                }else{
                    campground.Comments.push(comment);
                    campground.save();
                    res.redirect("/index/"+campground._id);
                };
                });

        }
        
    });
    });

app.listen(3000, function () {  
    console.log("Project works fine");
});