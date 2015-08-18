Angular.module('shareAustin')

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
  };
  return reqObj
})
  