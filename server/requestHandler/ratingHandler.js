var Rating = require('../model/rating.js')

module.exports = {
  addRating : function(req, res) {
    var attr = req.body;
    console.log("add rating handler")
    console.log(attr)
    new Rating().save(attr)
    .then(function (rating){
      res.json(rating);
    }) 
  },
}