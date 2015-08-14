angular.module('shareAustin')
.controller('ItemDescriptionCtrl', function ($scope, $location, Item, Request) {
  $scope.item = Item.get();
  $scope.today = new Date();
  
  //Get item's transactions to show availability
  Request.items.fetchItemTransactions(Item.get().id, $scope.today)
  .then(function(data){
    console.log("Response from server: ", data);
    $scope.itemTransactions = data;
  });

  //Function to check start_date and end_date of each transaction

  $scope.rentRedirect = function () {
    $location.path('/transaction')
  }
})
