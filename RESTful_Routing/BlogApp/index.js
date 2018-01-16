var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();


// CONFIGURATIONS

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// MODEL CONFIGURATIONS

var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "http://maxpixel.freegreatpicture.com/static/photo/1x/Nature-Young-Eyes-Lion-Close-Juvenile-Wildlife-2808134.jpg"},
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "http://maxpixel.freegreatpicture.com/static/photo/1x/London-Tower-Bridge-Monument-England-River-Thames-3078109.jpg",
//     body: "This is a test, but that bridge looks pretty sick."
// })

app.get("/", function(req, res){
    res.redirect("/blogs");
})

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Error");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running.");
});