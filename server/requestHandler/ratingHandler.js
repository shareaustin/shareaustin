var Rating = require('../model/rating.js')

module.exports = {
  addRating : function(req, res) {
    var attr = req.body;
    new Rating(attr).save()
    .then(function (rating){
      res.json(rating);
    }) 
  },
}