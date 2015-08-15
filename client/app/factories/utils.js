
// File contains functions to be used in contollers especially server requests

angular.module('shareAustin')

.factory('Request', function($http){
  var reqObj = {
    user: {
      fetchUser: function(){
        return $http({
          method: 'GET',
          url: '/api/user'
        })
        .then(function(resp){
          //console.log(resp.data);
          return resp.data;
        })
      },

      fetchSellerRating: function(){
        return $http({
          method: 'GET',
          url: '/api/user/seller_ratings'
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
        })
        .then(function(resp){
        // console.log(resp.data);
        return resp.data;
        })
      }
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
    },
}
  return reqObj;
})
.factory('Auth', function($http){
  var api = {
    user: {},
    getUser: function(){
      return this.user;
    },

    setUser: function(data){
      this.user = data;
    },

    signup: function(user){
      return $http({
        method: 'POST',
        url: '/signup',
        data: user,
      })
      .then(function(resp){
        return resp.data;
      });
    },

    signin: function(user){
      return $http({
        method:'POST',
        url: '/signin',
        data: user,
      })
      .then(function(resp){
        console.log('in auth factory')
        console.log(resp.data)
        return resp.data;
      });
    }
  }
  return {
    signup: api.signup,
    signin: api.signin,
    getUser: api.getUser,
    setUser: api.setUser
  };
})

.factory('Item', function ($http, Upload) {
  var search = {
    term: ""
  }
  var itemDescription = {}
  function set(data) {
    itemDescription = data;
  };

  function get() {
   return itemDescription;
  };

  function uploadPhoto(item_id, file){
    console.log('in item util. item id is ', item_id)

    Upload.upload({
      url: 'api/user/item/photos/upload',
      file: file,
      fields: {item_id: item_id}
    })
    .progress(function (evt){
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
    })
    .success(function (data, status, headers, config){
      console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
      itemDescription.photo_url = data.photo_url;
    })
    .error(function (data, status, headers, config){
      console.log('error status: ' + status);
    });
  }

  return {
   set: set,
   get: get,
   uploadPhoto: uploadPhoto,
   search: search
  }
})

.factory('Socket', function(socketFactory){
  return socketFactory();
})
