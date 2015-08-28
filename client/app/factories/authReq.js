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

  // Used locally to determine if user is logged
  function isLoggedOut() {
    return Object.keys(user)[0]  === undefined
  }

  // Returns user to emptpy object, a "local" sign out
  function localSignOut() {
    user = {};
  }

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

  function signout(){
    return $http({
      method: 'POST',
      url: '/signout'
    })
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
    signout: signout,
    getUser: getUser,
    setUser: setUser,
    isAuthorized: isAuthorized,
    isLoggedOut: isLoggedOut,
    localSignOut: localSignOut 
  };
})

