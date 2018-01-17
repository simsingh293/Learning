var express = require("express"),
mongoose = require("mongoose"),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),
app = express();


mongoose.connect("mongodb://localhost/opendis_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

var disSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
    author: String,
    topic: String
});

var Dis = mongoose.model("Dis", disSchema);

// Dis.create({
//     title: "Test Post",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR6Xlnbyx-IvCSrwe7Snso3Pt7K2NcNclopW_OuaYLp0vxf7iU",
//     body: "This is test content",
//     author: "John Smith",
//     topic: "Functionality testing"
// });

app.get("/", function(req, res){
    res.redirect("/home");
});

app.get("/home", function(req, res){
    Dis.find({}, function(err, posts){
        if(err){
            console.log(err);
            res.send("There was an error")
        } else {
            res.render("index", {posts: posts});
        }
    });
});

app.get("/new", function(req, res){
    res.render("new");
});

app.post("/home", function(req, res){
   req.body.post.body = req.sanitize(req.body.post.body);
   Dis.create(req.body.post, function(err, newDis){
       if(err){
           res.render("new");
       } else {
           res.redirect("/home");
       }
   });
});

app.get("/home/:id", function(req, res){
    Dis.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log(err);
            res.redirect("/home")
        } else {
            res.render("show", {post: foundPost})
        }
    });
});

app.get("/home/:id/edit", function(req, res){
   Dis.findById(req.params.id, function(err, foundPost){
       if(err){
           console.log(err);
           res.redirect("/home")
       } else {
           res.render("edit", {post: foundPost});
       }
   }); 
});

app.put("/home/:id", function(req, res){
    req.body.post.body = req.sanitize(req.body.post.body);
    Dis.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
        if(err){
            console.log(err);
            res.redirect("/home")
        } else {
            res.redirect("/home/" + req.params.id)
        }
    });
});

app.delete("/home/:id", function(req, res){
    Dis.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/home");
        } else {
            res.redirect("/home");
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running!!");
});