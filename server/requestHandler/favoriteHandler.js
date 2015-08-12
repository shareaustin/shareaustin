var Favorite = require('../model/favorite.js')
var Item     = require('../model/item.js')

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
    var favorites = req.body
    var model  = []
    function callback() {
      for (var i = 0; i < favorites.length; i++) {
        model.push(Item.getItemById(favorites[i].item_id))
        return model
      }
    }
    callback().then(function(model){
      res.json(model)
    })
  }
}
