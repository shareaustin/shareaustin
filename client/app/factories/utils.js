
// File contains functions to be used in contollers especially server requests

angular.module('shareAustin')

.factory('Request', function($http){
  var reqObj = {
    
    // Requests associated with user models
    user: {
      // Returns an average of that sellers rating
      fetchSellerRating: function(){
        return $http({
          method: 'GET',
          url: '/api/user/seller-ratings'
        })
        .then(function(resp){
          console.log(resp.data);
          return resp.data;
        })
      },
      // Returns all of a seller's sold transactions
      fetchSoldTransactions: function() {
        return $http({
          method: 'GET',
          url: '/api/user/soldTransactions',
        })
        .then(function(resp){
          return resp.data;
        })
      },
      // Returns all of a buyer's bought transactions
      fetchBoughtTransactions: function() {
        return $http({
          method: 'GET',
          url: '/api/user/boughtTransactions',
        })
        .then(function(resp){
          return resp.data;
        })
      },
    },
    // Request associated with ratings model
    ratings: {
      // Creates new rating in db
      addRating: function(rating) {
        return $http({
          method: "POST",
          url   : "api/addRating",
          data  : rating
        }).then(function(resp) {
          return resp.data;
          })
      },
      // Updates an existing rating model
      updateRating: function(rating) {
        return $http({
          method: "POST",
          url   : "api/updateRating",
          data  : rating
        }).then(function(resp) {
          return resp.data;
        })
      },
      // fetches a rating based on transaction id
      fetchRating: function(trsn_id) {
        return $http({
          method: "POST",
          url   : "api/fetchRating",
          data  : {id : trsn_id}
        })
      }
    },

    // Requests associated with items.
    // Also includes transaction requests
    items: {
      // get all available itesm
      fetchAvailableItems: function() {
        return $http({
          method: 'GET',
          url: '/api/availableItems'
        })
        .then(function(resp){
          console.log(resp.data);
          return resp.data;
        })
      },
      // Fetches a user's for-rental listings
      fetchCurrentListings:function() {
        return $http({
          method: 'GET',
          url   : 'api/currentListings'
        })
      },
      // Creates a new item in db
      submitNewListing: function(item) {
        return $http({
          method: 'POST',
          url: '/api/addItem',
          data: item
        })
        .then(function(resp){
          return resp.data;
        })
      },
      // Changes attributes of an existing item in db
      editItem: function(item) {
        return $http({
         method: 'POST',
         url: 'api/editItem',
         data: item
        })
        .then(function(resp){
         return resp.data;
        })
      },
      // Not used, delete this ???
      deactivateItem: function(item) {
        return $http({
         method: 'POST',
         url: '/api/deactivateItemById',
         data: item
        })
        .then(function(resp){
         return resp.data;
        })
      },
      // Gets an item based on its id
      itemById: function(itemId) {
        console.log("utils itemId:" +itemId)
       return $http({
        method: 'POST',
        url: '/api/getItemById/',
        data: { itemId : itemId }
        })
        .then(function(resp){
          console.log(resp.data);
          return resp.data;
        })
      },
      // get all the transactions associated with an item
      fetchItemTransactions: function(itemId, today) {
        // console.log("fetching transactions for item: ", itemId);
        return $http({
          method: 'POST',
          url: 'api/getItemTransactions/',
          data: { item_id: itemId, today: today }
          })
          .then(function(resp){
            console.log(resp.data);
            return resp.data;
          })
      },
      //creates a new transaction in db
      addTransaction: function(transaction) {
        return $http({
         method: 'POST',
         url: 'api/addTransaction',
         data: transaction
        })
        .then(function(resp){
         console.log(resp.data)
         return resp.data;
        })
      },
      //updates an existing transaction in db
      updateTransaction: function(transaction) {
        return $http({
          method: "POST",
          url   : "api/updateTransaction",
          data  : transaction
        })
        .then(function(resp) {
          console.log(resp.data)
          return resp.data
        })
      },
      // Google api, send an address string, get location info
      getLocation: function(address) {
        return $http({
          method: "GET",
          url:    "https://maps.googleapis.com/maps/api/geocode/json?"+address,
        }).then(function(resp) {
          return resp.data;
        })
      },
      // get all photos associated with an item
      itemPhotos: function(itemId) {
       // console.log("utils itemPhotos itemId:" +itemId)
       return $http({
        method: 'POST',
        url: '/api/getItemPhotos/',
        data: { itemId : itemId.id }
        }).then(function(resp) {
          // console.log(resp.data);
          return resp.data;
        })
      },
    },

    // Requests associated with favorites
    favorites: {
      // add an item to a users favorites
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
      // Fetches items for a give id
      fetchFavoriteItems: function(user_id) {
        return $http({
          method: 'POST',
          url   : '/api/userFavoriteItems',
          data  : {"userId" : user_id} ,
        }).then(function(resp) {
          return resp.data
        })
      }, 
      // deletes a favorite from database
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
  return reqObj;
})
