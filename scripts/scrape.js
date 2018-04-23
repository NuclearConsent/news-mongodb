var axios = require("axios");
var cheerio = require("cheerio");

// Scrape the NYTimes
var scrape = function() {
  // Define URL
  return axios.get("http://www.nytimes.com").then(function(res) {
    var $ = cheerio.load(res.data);
    // Empty Array to store articles
    var listArticles = [];

    // Loop through each .theme-summary element
    $(".theme-summary").each(function(i, element) {
      // Grab the text
      var head = $(this)
        .children(".story-heading")
        .text()
        .trim();

      // Grab the URL
      var url = $(this)
        .children(".story-heading")
        .children("a")
        .attr("href");

      // Then we grab any children with .summary
      var sum = $(this)
        .children(".summary")
        .text()
        .trim();

      // Do if nothing is empty
      if (head && sum && url) {
        // Remove extra spacing
        var headlineClean = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var summaryClean = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Create an object
        var dataObject = {
          headline: headlineClean,
          summary: summaryClean,
          url: url
        };
        // Push articles to array
        listArticles.push(dataObject);
      }
    });
    return listArticles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;
