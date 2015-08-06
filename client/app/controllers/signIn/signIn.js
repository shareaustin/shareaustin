angular.module('shareAustin')

// Declares a sign controller with user info
.controller('SignInCtrl', function($scope) {
  $scope.user = {
    userName: '',
    password: ''
  };


  $scope.submitSignIn = function ($scope) {
    //Post request to server
  }
})
