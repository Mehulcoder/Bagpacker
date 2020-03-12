var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// Start routing
router.get("/", function (req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
           res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
     });
});

// INDEX----->Show all campgrounds
//At last we'll pass the user data(id and name) to the index page
router.get("/index", function (req, res) {
        //Get all the campgrounds from the database and call it allcampgrounds
        Campground.find({}, function (err, allcampgrounds) {
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:allcampgrounds, currentUser:req.user});
            //Pass allcampgrounds fetched as campgrounds to the render
        }
     });
});


 // CREATE-----> add new campground
 router.post("/index", function (req, res) {
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
router.get("/index/new", function (req, res) { 
    //This is the place to fill the form
    res.render("campgrounds/new");
 });


//SHOW -- show more information for the perticular id
 router.get("/index/:id", function (req, res) {
     Campground.findById(req.params.id).populate("Comments").exec(function (err, foundCampground) { 
         if(err){
             console.log(err);
         }else{
             console.log(foundCampground);
            res.render("campgrounds/show", {campground:foundCampground});
         }
      });
 });

 function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else {
        res.redirect("/login");
    }
}

module.exports = router;

