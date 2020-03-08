var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// Tell our code that the css file and JS file will be included in the public folder
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("landing");  
});

var campgrounds = [
    {Name: "Rainbow Beach", Image: "https://images.pexels.com/photos/2255866/pexels-photo-2255866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {Name: "Indonasia", Image: "https://images.pexels.com/photos/3699347/pexels-photo-3699347.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {Name: "Japan", Image: "https://images.pexels.com/photos/1822605/pexels-photo-1822605.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
    
];

app.get("/campgrounds", function (req, res) {  
    

    res.render("campgrounds", {campgrounds: campgrounds});
});



app.post("/campgrounds", function (req, res) {
    //Get data from form and add it to campgrounds array
    //Redirect back to campgrounds list page

    var name = req.body.name;
    var url = req.body.image;
    var newcampground = {Name:name, Image:url};
    campgrounds.push(newcampground);

    res.redirect("/campgrounds");

});

app.get("/campgrounds/new", function (req, res) { 
    //This is the place to fill the form
    res.render("new");
 });

app.listen(3000, function () {  
    console.log("Project works fine");
});