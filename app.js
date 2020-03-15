var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local");
//requiring seedsDB
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
//Include routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/index");
var methodOverride = require("method-override");
var ejsLint = require('ejs-lint');


// Connect mongoose
mongoose.connect("mongodb+srv://Mehul:Mehul_007@cluster0-brhdg.mongodb.net/test?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
// console.log(__dirname);
app.set("view engine", "ejs");

// seedDB(); //seed the database

//Passport configuration
app.use(require("express-session")({
    secret: "Once again rusty is the cutest dog",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//SO that we do not have to add it to every route
////////
//NEW///
///////
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
 });


///////////
//ROUTES//
//////////
app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(authRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});
    