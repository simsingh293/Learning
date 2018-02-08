var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "http://www.americansouthwest.net/california/photographs700/clouds-yosemite2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt neque a vulputate imperdiet. Fusce scelerisque libero eget pharetra vestibulum. Nulla eu leo sit amet tortor vestibulum vehicula. Proin ut ullamcorper justo. Nullam malesuada arcu ac neque commodo placerat. Vestibulum imperdiet aliquet mi. Curabitur odio neque, sagittis et lacus eu, efficitur auctor leo. Aenean nisi lorem, aliquam in aliquam ac, viverra eu enim. Morbi varius convallis sem, at dapibus magna condimentum nec. Fusce eget mollis quam."
    },
    {
        name: "Cloud's Awakening", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOPRiZ9cTZ47s1nuXYzWkGS8HSOcbxG759L5FXsXmYg4oCBcpFuQ",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt neque a vulputate imperdiet. Fusce scelerisque libero eget pharetra vestibulum. Nulla eu leo sit amet tortor vestibulum vehicula. Proin ut ullamcorper justo. Nullam malesuada arcu ac neque commodo placerat. Vestibulum imperdiet aliquet mi. Curabitur odio neque, sagittis et lacus eu, efficitur auctor leo. Aenean nisi lorem, aliquam in aliquam ac, viverra eu enim. Morbi varius convallis sem, at dapibus magna condimentum nec. Fusce eget mollis quam."
    },
    {
        name: "Cloud's Anger", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDRswO5GHh0R-kCXVFvwUZ0V0Yj57uOcTUEpLUbdHqbkfWbxNQHQ",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt neque a vulputate imperdiet. Fusce scelerisque libero eget pharetra vestibulum. Nulla eu leo sit amet tortor vestibulum vehicula. Proin ut ullamcorper justo. Nullam malesuada arcu ac neque commodo placerat. Vestibulum imperdiet aliquet mi. Curabitur odio neque, sagittis et lacus eu, efficitur auctor leo. Aenean nisi lorem, aliquam in aliquam ac, viverra eu enim. Morbi varius convallis sem, at dapibus magna condimentum nec. Fusce eget mollis quam."
    },
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds!");
            // add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err,campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added placeholder campgrounds");
                        // add a few comments
                        Comment.create(
                            {
                                text: "This place is great, but i wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err)
                                } else {
                                    campground.comments.push(comment._id);
                                    campground.save();
                                    console.log("created new comments");
                                }
                            });
                    }
                });
            });
        }
    });
    
    
}

module.exports = seedDB;