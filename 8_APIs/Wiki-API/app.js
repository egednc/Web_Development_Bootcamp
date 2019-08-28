//jshint esversion:6

// Setup npm modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

// Setup ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// Connect mongodb
mongoose.connect("mongodb://localhost:27017/wikiDB", {userNewUrlParser: true});

// Setup schema and collection
const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

// GET all articles
app.get("/articles", function(req, res){
  Article.find(function(err, foundArticles){
    if(!err){
      console.log(foundArticles);

      res.send(foundArticles);
    }else{
      res.send(err);
    }
  });
});


app.listen(3000, function(){
  console.log("Server started on port 3000");
});