angular.module('shareAustin')
.controller('MenuCtrl', function ($scope, Auth) {
  $scope.hamburgerStatus = false;
  $scope.hamburgerToggle = function () {
    $scope.hamburgerStatus = ($scope.hamburgerStatus === false) ? true : false
    console.log($scope.hamburgerStatus)
  }
  $scope.user = null
  Auth.getUser().then(function(user) {
    $scope.user = user
  })  
})
.directive('menu', function () {
  return {
    restrict: "E",
    templateUrl: "app/directives/menu/menu.html",
    controller: 'MenuCtrl',
  }
})
