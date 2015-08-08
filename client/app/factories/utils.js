
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
          console.log(resp.data);
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
         console.log(resp.data)
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
    }
  }
}
  return reqObj;
})

