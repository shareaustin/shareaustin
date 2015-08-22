// Auth factory
angular.module('shareAustin')
.factory('Auth', function($http){
  
  var user = {};
  
  // Getter
  function getUser(){
    return user;
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
      console.log('in auth factory')
      console.log(resp.data)
      return resp.data;
    });
  };

  // Checks authorization
  function isAuthorized(){
    return $http({
      method: 'GET',
      url: '/auth',
    }).then(function(resp){
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

