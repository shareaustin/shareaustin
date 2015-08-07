angular.module('shareAustin')

.controller('EditItemCtrl', function($scope, Request) {
  var item_id = 1;

  $scope.getItemById = function(item_id) {
    Request.items.itemById(item_id)
  },

  $scope.editItem = function(item) {
    Request.items.editItem(item);
  };

});