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
  }
}
