
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
      }
  }
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

.factory('Item', function () {
  var itemDescription = {}
  function set(data) {
    itemDescription = data;
  }
  function get() {
   return itemDescription;
  }

  return {
   set: set,
   get: get
  }
})
