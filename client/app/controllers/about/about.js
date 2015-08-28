angular.module('shareAustin')

.controller ('AboutCtrl', function ($scope, Auth){
  //Auth.isAuthorized().then(function(user) {
    $scope.loggedOut = !Auth.isLoggedIn()
    //console.log($scope.loggedOut)
  //})
})