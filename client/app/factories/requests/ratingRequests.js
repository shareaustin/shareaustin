Angular.module('shareAustin')
.factory('Request', function($http){
  var reqObj = {   
    ratings: {
      addRating: function(rating) {
        return $http({
          method: "POST",
          url   : "api/addRating",
          data  : rating
        }).then(function(resp) {
            return resp.data;
          })
      }
    }
  }
  return reqObj
})