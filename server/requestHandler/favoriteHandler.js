var Favorite = require('../model/favorite.js')

module.exports = {
  addFavorite: function (req, res) {
    console.log('***ADD FAVORITE*** ', req.body)

    var attr = {
      'user_id' : req.body.user_id,
      'item_id' : req.body.item_id
    }
    new Favorite(attr).save()
    .then(res.json("Item Favorited"))
  },
  userFavoriteItems: function(req,res) {
    console.log("in user favs")
    var userId = req.user ? req.user.attributes.id : 1;
    Favorite.where({'user_id':userId}).fetchAll()
    .then(function(model) {
      console.log("User favorites model: ", model);
      res.json(model)
    })
  }
}
