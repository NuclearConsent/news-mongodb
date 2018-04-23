var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
  scrapeHeadlines: function(req, res) {
    // Start Scrape
    return scrape().then(function(articles) {
      // Add articles to db
      return db.Headline.create(articles);
    }).then(function(dbHeadline) {
      if (dbHeadline.length === 0) {
        res.json({
          message: "No new articles found"
        });
      }
      else {
        // Return new article count
        res.json({
          message: "New Articles Found:  " + dbHeadline.length
        });
      }
    }).catch(function(err) {
      // Send complete message
      res.json({
        message: "The Scrape is complete"
      });
    });
  }
};
