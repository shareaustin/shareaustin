
// File contains functions to be used in contollers especially server requests

angular.module('shareAustin')

.factory('Request', function($http){
  var reqObj = {
    user: {
      fetch: function(){
        return $http({
          method: 'GET',
          url: '/dashboard'
        })
        .then(function(resp){
          return resp.data;
        })
      }
    }
  }
  return reqObj;
})

