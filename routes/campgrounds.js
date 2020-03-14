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


// NEW------->Show form to create new campground
router.get("/index/new",isLoggedIn, function (req, res) { 
    //This is the place to fill the form
    res.render("campgrounds/new");
 });


 // CREATE-----> add new campground
 router.post("/index",isLoggedIn, function (req, res) {
    //Get data from form and add it to campgrounds array
    //Redirect back to campgrounds list page

    //req.body will give us the content of the form which we filled
    var name = req.body.name;
    var url = req.body.image;
    var desc = req.body.desc;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    console.log(req.user);
    var newcampground = {Name:name, Image:url, Desc:desc, Author: author};

    Campground.create(newcampground, function (err, newcamp) { 
        if(err){
            console.log(err);
        }else{
            console.log("New Campground added");
            // console.log(newcamp);
        }
    });

    res.redirect("/index");

});


//SHOW -- show more information for the perticular id
 router.get("/index/:id", function (req, res) {
     Campground.findById(req.params.id).populate("Comments").exec(function (err, foundCampground) { 
         if(err){
             console.log(err);
         }else{
             console.log(foundCampground);
            res.render("campgrounds/show", {campground:foundCampground, currentUser:req.user});
         }
      });
 });

 //Edit campground----->>>
router.get("/index/:id/edit",checkCampgroundOwnership ,function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) { 
        if (err) {
            console.log(err);
            res.redirect("/index");
        }else{
            res.render("../views/campgrounds/edit", {campground: foundCampground});
        }
    });

});

// UPDATE CAMPGROUND ROUTE
router.put("/index/:id", checkCampgroundOwnership ,function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
           console.log(err);
           res.redirect("/index");
       } else {
           //redirect somewhere(show page)
           res.redirect("/index/" + updatedCampground._id);
       }
    });
});

//Destroy campground rote
router.delete("/index/:id",checkCampgroundOwnership ,function (req, res) {
    console.log("I'm here");
    Campground.findByIdAndRemove(req.params.id, function (err) { 
        if(err){
            console.log(err);
            res.redirect("/index");
        }else{
            res.redirect("/index");
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

//Check campground ownership
function checkCampgroundOwnership(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               res.redirect("back");
           }  else {
            // does user own the campground?
            if(foundCampground.Author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;

