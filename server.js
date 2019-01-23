// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

var cheerio = require("cheerio");
var axios = require("axios");

// Add code to userModel.js to complete the model
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Requiring the `User` model for accessing the `users` collection
var Article = require("./models/Article.js");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/userdb", { useNewUrlParser: true });



// Make a request via axios to grab the HTML body from the site of your choice
axios.get("https://www.nytimes.com/section/science").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("article").each(function(i, element) {

    var title = $(element).find("a").text();
    var link = $(element).find("a").attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });
  
  })

    app.post("/scrape", function(req, res) {
      
      console.log("scrapinggg...")
      // Create a new user using req.body
      Article.insertMany(results)
        .then(function(dbArticle) {
          // If created successfully, send the the new User document to the client
          console.log("done scraping")
          res.json(dbArticle);
        })
        .catch(function(err) {
          // If an error occurs, send the error to the client
          res.json(err);
        });
    });
    
    
    app.get("/scrape", function(req, res) {
      Article.find({}, function(err, dbArticle){
        res.send(dbArticle)
      })
  
    })

    // Start the server
    app.listen(PORT, function() {
      console.log("App running on port " + PORT + "!");
    });
    
  });

  

  // Log the results once you've looped through each of the elements found with cheerio


