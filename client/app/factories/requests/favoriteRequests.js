Angular.module('shareAustin')
// Favorites requests
.factory('Request', function($http){
  var reqObj = {
    favorites: {
      // Adds a new favorite to the database
      addFavorite: function(item) {
        console.log("utils fav item ", item)
        return $http({
          method: 'POST',
          url: '/api/addFavorite',
          data: item
        }).then(function(resp) {
          console.log(resp.data)
          return resp.data
        })
      },
      // Fetches all the favorites for a specific user
      fetchFavoriteItems: function(user_id) {
        return $http({
          method: 'POST',
          url   : '/api/userFavoriteItems',
          data  : {"userId" : user_id} ,
        }).then(function(resp) {
          return resp.data
        })
      },
      // Deletes a favorite item from database 
      removeFavoriteItems: function(favorite) {
        return $http({
          method: 'POST',
          url: '/api/removeFavorite',
          data: favorite
        }).then(function(resp) {
          return resp.data
        })
      }
    } 
  }
  return reqObj
})
  