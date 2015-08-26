angular.module('shareAustin')
.controller('MenuCtrl', function ($scope) {
  $scope.hamburgerStatus = false;
  $scope.hamburgerToggle = function () {
    $scope.hamburgerStatus = ($scope.hamburgerStatus === false) ? true : false
    console.log($scope.hamburgerStatus)
  }
// when you click on hamburger menu
// change ul class name to adjust styling width 100%
// change ul li class name to be display block, text-align center
})
.directive('menu', function () {
  return {
    restrict: "E",
    templateUrl: "app/directives/menu/menu.html",
    controller: 'MenuCtrl',
  }
})
