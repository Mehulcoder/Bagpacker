var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


 // ==============
// Comments Routes
// ==============

//Comments New
router.get("/index/:id/comments/new", isLoggedIn, function (req, res) { 
    console.log(req.params.id);
    Campground.findById(req.params.id, function (err, campground) { 
        if (err) {
            console.log(err);
        }else{
            res.render("comments/new", {campground:campground});
        }
     });
 });

//Comments Create
 //Add isLoggedIn to prevent from getting requests through postman
 router.post("/index/:id/comments",isLoggedIn, function (req, res) { 
   
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
                }
                });

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

