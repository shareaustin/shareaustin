// Auth factory
angular.module('shareAustin')

.factory('Auth', function($http){
  var user = {};
  
  // Getter
  function getUser(){
    return $http({
      method: 'GET',
      url: '/api/user'
    }).then(function(resp){
      return resp.data;
    })
  };

  //Setter
  function setUser(data){
    user = data;
  };

  // Sign up request
  function signup(user){
    return $http({
      method: 'POST',
      url: '/signup',
      data: user,
    })
    .then(function(resp){
      return resp.data;
    });
  };

  // Sign in request
  function signin(user){
    return $http({
      method:'POST',
      url: '/signin',
      data: user,
    })
    .then(function(resp){
      return resp.data;
    });
  };

  // Checks authorization
  function isAuthorized(){
    return $http({
      method: 'GET',
      url: '/auth',
    }).then(function(resp){
      user = resp.data;
      return(resp.data);
    })
  }

  // Return these functions as properties of the factory
  return {
    signup: signup,
    signin: signin,
    getUser: getUser,
    setUser: setUser,
    isAuthorized: isAuthorized
  };
})

