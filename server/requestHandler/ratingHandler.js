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
  getRating : function(req, res) {
    var id = req.body.id
    console.log("gr id: "+id)
    Rating.where({ transaction_id : id }).fetch()
    .then(function(model, error) {
      console.log("model:"+model+" error:"+error)

      res.json(model)
    })
  },
  updateRating : function(req, res) {
    var attr = req.body;
    console.log("edit rating handler")
    new Rating({
      transaction_id : attr.transaction_id
    }).save(attr, {patch: true})
    .then(res.json("Rating updated!"))
    // new Item({
    //   id: 1
    // }).save(req.body, {patch: true})
    // .then(res.json("Item updated!"))
  }
}