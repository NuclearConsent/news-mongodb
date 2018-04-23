var db = require("../models");

module.exports = {
  // Find a note
  findOne: function(req, res) {
    db.Comment
      .findOne(req.query)
      .then(function(dbComment) {
        res.json(dbComment);
    });
  },
  // Create a note
  create: function(req, res) {
    db.Comment
      .create(req.body)
      .then(function(dbComment) {
        res.json(dbComment);
    });
  },
  // Delete a note (With ID)
  delete: function(req, res) {
    db.Comment
      .remove({ _id: req.params.id })
      .then(function(dbComment) {
        res.json(dbComment);
    });
  }
};
