angular.module('shareAustin')

.controller('EditItemCtrl', function($scope, Request) {
  var item_id = 1;

  $scope.getItemById = function(itemId) {
    Request.items.itemById(itemId)
  },

  $scope.editItem = function(item) {
    Request.items.editItem(item);
  };

  var item = $scope.getItemById(1);
  console.log("Everything worked: " + item)
});