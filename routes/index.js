var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
//////////////
//Auth routes
////////////

//Show register form
router.get("/register", function (req, res) { 
    res.render("register");
});


///IMPORTANT
//Handle Sign up logic
router.post("/register", function (req, res) { 
    var newUser = new User({username: req.body.username});
    User.register(newUser , req.body.password, function (err, user) {  
        if(err){
            console.log(err);
            return res.render("register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/index");
            });
        }
    });
});


//Handle sign in request
router.get("/login", function (req, res) {  
    res.render("login");
});


///IMPORTANT
//Handle login logic
router.post("/login", passport.authenticate('local',
    {
        successRedirect:"/index",
        failureRedirect:"/login"
    }) ,function (req, res) {  

});

//Add logout route
router.get("/logout", function (req, res) { 
    req.logout();
    res.redirect("/index");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else {
        res.redirect("/login");
    }
}


module.exports = router;