angular.module('shareAustin')

.controller('EditItemCtrl', function($scope, Request) {

  $scope.editItem = function(item) {
    Request.editItem(item);
  };

});