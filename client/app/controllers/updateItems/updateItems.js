angular.module('shareAustin')

.controller('EditItemCtrl', function($scope, Request, currentItem) {

  $scope.getItemById = function(itemId) {
    Request.items.itemById(itemId).then(function(item) {
      $scope.item = item;
    })
  },

  $scope.editItem = function(item) {
    Request.items.editItem(item);
  };
  
  //Example -- you would run this from the previous view's controller 
  //to set the currentItem
  // currentItem.set(2);

  //Check the currentItem's id and populate template with those values
  $scope.getItemById(currentItem.get());
});