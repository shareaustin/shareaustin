angular.module('shareAustin')

// Declares a sign controller with user info
.controller('SignInCtrl', function($scope, $location, Request) {
  $scope.user = {
    userName: '',
    password: ''
  };


  $scope.submitSignIn = function () {
    //Post request to server
    Request.user.userSignIn($scope.user).then(function (results) {
      console.log(results);
      if(results === "true") {
        $location.path('/dashboard');
      } else {
        console.log('submitSignIn failed');
        $location.path('/signin');
      }
    });
  }
})
