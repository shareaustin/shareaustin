angular.module('shareAustin')
.factory('Auth', function($http){
  var user = {};

  function getUser(){
    return user;
  };

  function setUser(data){
    user = data;
  };

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

  function isAuthorized(){
    return $http({
      method: 'GET',
      url: '/auth',
    }).then(function(resp){
      console.log('Am i authorized? ', resp.data)
      return(resp.data);
    })
  }

  return {
    signup: signup,
    signin: signin,
    getUser: getUser,
    setUser: setUser,
    isAuthorized: isAuthorized
  };
})

