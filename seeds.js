var mongoose = require("mongoose");
// Schema setup
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        Name: "Cloud's Rest", 
        Image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        Desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        Name: "Desert Mesa", 
        Image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        Desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        Name: "Canyon Floor", 
        Image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        Desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function (err, campgrounds) { 
        if(err){
            console.log(err);
        }else{
            console.log("Removed campgrounds");
            //add new campgrounds
            data.forEach(function (seed) { 
                Campground.create(seed,function (err, campground) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added campgrounds");
                        //Create a new comment
                        Comment.create({
                            content:"Hello this is a comment",
                            author:"Mehul Chaturvedi"
                        }, function (err, comment) { 
                            if (err) {
                                console.log(err);
                            }else{
                                campground.Comments.push(comment);
                                campground.save();
                                
                            }
                         });
                    }
                });
             });
        }
     });    
}

module.exports = seedDB;
