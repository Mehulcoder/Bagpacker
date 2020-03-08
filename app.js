var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");  
});

app.get("/campgrounds", function (req, res) {  
    var campgrounds = [
        {Name: "Rainbow Beach", Image: "https://images.pexels.com/photos/2255866/pexels-photo-2255866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
        {Name: "Indonasia", Image: "https://images.pexels.com/photos/3699347/pexels-photo-3699347.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
        {Name: "Japan", Image: "https://images.pexels.com/photos/1822605/pexels-photo-1822605.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
        
    ];

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function (req, res) {
    res.send("You are in the post route");
});

app.listen(3000, function () {  
    console.log("Project works fine");
});