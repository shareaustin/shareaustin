angular.module('shareAustin')
.controller('MenuCtrl', function ($scope, Auth) {
  // Used to determine wether or not to show "login" tab
  $scope.isLoggedIn = !Auth.isLoggedOut()

  $scope.hamburgerStatus = false;
  $scope.hamburgerToggle = function () {
    $scope.hamburgerStatus = ($scope.hamburgerStatus === false) ? true : false
    console.log($scope.hamburgerStatus)
  }
})
.directive('menu', function () {
  return {
    restrict: "E",
    templateUrl: "app/directives/menu/menu.html",
    controller: 'MenuCtrl',
  }
})
