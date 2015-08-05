angular.module('shareAustin')

.controller('SignInCtrl', function($scope) {
  $scope.user = {
    userName: '',
    password: ''
  };

  $scope.submitSignIn = function ($scope) {
    //Post request to server
  }
})
