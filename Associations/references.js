var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/embed_demo_2");

var Post = require("./models/post");

var User = require("./models/user");


// User.create({
//     email: "bob@gmail.com",
//     name: "Bob the Builder"
// });

Post.create({
    title: "How to the best chicken parrt 4",
    content: "fa ajhdsjk sajd khajksdh"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post._id);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});


// Find User
// Find all posts for that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });