angular.module('shareAustin')
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

