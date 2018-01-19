var express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),
app = express();



// mongoose.connect("mongodb://localhost/game_site");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


var featureSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png"},
    body: String,
    created: {type: Date, default: Date.now}
    
});

var Feature = mongoose.model("Feature", featureSchema);



app.get("/", function(req, res){
    res.render("home");
});

app.get("/features", function(req, res){
    res.render("features");
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running");
});