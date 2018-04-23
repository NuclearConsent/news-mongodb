var mongoose = require("mongoose");

// Create a schema
var Schema = mongoose.Schema;

// Create a new collection
var headline = new Schema({
  headline: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  summary: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  saved: {
    type: Boolean,
    default: false
  }
});

// Create the Headline model
var Headline = mongoose.model("Headline", headline);

// Export headline
module.exports = Headline;
