angular.module('shareAustin')
.controller('MenuCtrl', function ($scope) {

})
.directive('menu', function () {
  return {
    restrict: "E",
    templateUrl: "app/directives/menu/menu.html",
    controller: 'MenuCtrl',
  }
})
