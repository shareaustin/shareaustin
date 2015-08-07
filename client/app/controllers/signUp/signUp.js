angular.module('shareAustin')

.controller('SignUpCtrl', function ($scope, Request) {
  $scope.submitSignUp = function ($scope) {
    Request.user.userSignUp();
  }
})
