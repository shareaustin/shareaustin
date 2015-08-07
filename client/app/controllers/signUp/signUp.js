angular.module('shareAustin')

.controller('SignUpCtrl', function ($scope, $location, Request) {
  $scope.user = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: ''
  }

  $scope.submitSignUp = function (test) {
    console.log('inside signupJS ', test)
    Request.user.userSignUp(test).then(function () {
      $location.path('/dashboard')
    });
  }
})
