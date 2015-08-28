angular.module('shareAustin')
.controller('MenuCtrl', function ($scope, Auth) {
  $scope.isLoggedIn = !Auth.isLoggedOut()

  $scope.hamburgerStatus = false;
  $scope.hamburgerToggle = function () {
    $scope.hamburgerStatus = ($scope.hamburgerStatus === false) ? true : false
    console.log($scope.hamburgerStatus)
  }
  // $scope.user = $scope.user || null; 
  // Auth.getUser().then(function(user) {
  //   console.log(typeof user)
  //   $scope.user = user; 
  // })
  // console.log($scope.user)  
})
.directive('menu', function () {
  return {
    restrict: "E",
    templateUrl: "app/directives/menu/menu.html",
    controller: 'MenuCtrl',
  }
})
