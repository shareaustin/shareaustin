
// File contains functions to be used in contollers especially server requests

angular.module('shareAustin')

.factory('Request', function($http){
  var reqObj = {
    user: {
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
      fetchSoldTransactions: function() {
        return $http({
          method: 'GET',
          url: '/api/user/soldTransactions',
        })
        .then(function(resp){
          return resp.data;
        })
      },
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
    ratings: {
      addRating: function(rating) {
        return $http({
          method: "POST",
          url   : "api/addRating",
          data  : rating
        }).then(function(resp) {
          return resp.data;
          })
      },
      updateRating: function(rating) {
        return $http({
          method: "POST",
          url   : "api/updateRating",
          data  : rating
        }).then(function(resp) {
          return resp.data;
        })
      },
      fetchRating: function(trsn_id) {
        return $http({
          method: "POST",
          url   : "api/fetchRating",
          data  : {id : trsn_id}
        })
      }
    },
    items: {
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
      fetchCurrentListings:function() {
        return $http({
          method: 'GET',
          url   : 'api/currentListings'
        })
      },
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
      getLocation: function(address) {
        return $http({
          method: "GET",
          url:    "https://maps.googleapis.com/maps/api/geocode/json?"+address,
        }).then(function(resp) {
          return resp.data;
        })
      },
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
    favorites: {
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
      fetchFavoriteItems: function(user_id) {
        return $http({
          method: 'POST',
          url   : '/api/userFavoriteItems',
          data  : {"userId" : user_id} ,
        }).then(function(resp) {
          return resp.data
        })
      },
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
