var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

// Set port to 3001 or whatever heroku wants to use
var PORT = process.env.PORT || 3001;

// Initialize the app
var app = express();

// Set routes
var routes = require("./routes");

// Set public directory
app.use(express.static("public"));

// Set handlebars
var hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir:'views/layouts',
    partialsDir: 'views/partials',
    extname: '.hbs'
});
app.set('views', './views');
app.set('view engine', '.hbs');
app.engine('hbs', hbs.engine);

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Make every request go through routes middleware
app.use(routes);

// Use the database or local if not available
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news-mongodb";

// Connect to the db
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// HEY! Listen!!! :D
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
