angular.module('shareAustin')

.controller('EditItemCtrl', function($scope, Request) {

  $scope.getItemById = function(itemId) {
    Request.items.itemById(itemId).then(function(item) {
      $scope.item = item;
    })
  },

  $scope.editItem = function(item) {
    Request.items.editItem(item);
  };
  
  $scope.getItemById(2);
});