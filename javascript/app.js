/*  Auteur: Samuel Dubé
    Date de création: 2018/01/03
    Date de dernière: ******
    Description: Fichier node.js principal pour le projet blog
*/
//Dependencies
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOveride = require("method-override")

//Folder Included
mongoose.connect("mongodb://localhost/cooking_blog");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("css"));
app.use(express.static("javascript"));
app.use(express.static("img"));
app.use(methodOveride("_method"));
app.set("view engine", "ejs");
//Model and Schema
var blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    cat: String,
    img: String,
    desc: String,
    inst: String
});
var Blog = mongoose.model("blog", blogSchema);
//Routes
app.get("/", function (req, res) {
    res.redirect("/home");
});
app.get("/home", function (req, res) {
    Blog.find({}, function (err, foundBlog) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { blogs: foundBlog });
        }
    })
});
app.post("/home", function (req, res) {
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("New blog posted");
        }
    });
    res.redirect("/home");
});
app.get("/home/newblog", function (req, res) {
    res.render("newblog");
});
app.get("/home/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("editblog", { blog: foundBlog });
        }
    })
});
app.delete("/home/:id", function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err, deletedBlog) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/");
        }
    });
});
app.put("/home/:id", function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/");
        }
    });
});
app.get("/home/:id", function (req, res) {
    var id = req.params.id;
    Blog.find({ _id: id }, function (err, foundBlog) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("showblog", { blogs: foundBlog });
        }
    });
});
//Listener
app.listen(process.env.PORT, process.env.IP);
