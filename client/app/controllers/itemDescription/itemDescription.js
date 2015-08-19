angular.module('shareAustin')
.controller('ItemDescriptionCtrl', function ($scope, $location, Chat, Item, Request, CalEvents) {
  $scope.item = Item.get();
  console.log($scope.item)
  $scope.availItems = Request.items.fetchAvailableItems()

  $scope.rentRedirect = function () {
    $location.path('/transaction')
  }
  // Reviews - Filters seller reivews by id 
  $scope.sellerReviews = $scope.item.seller.soldTransactions
    .filter(function (trans) {
      return trans.rating.seller_review && trans.item_id === $scope.item.id
    }).map(function (transaction) {
      return transaction.rating.seller_review
    })
  if (!$scope.sellerReviews.length) $scope.sellerReviews.push("This Item Hasn't Been Reviewed Yet")
  };

  $scope.chatRedirect = function(){
    Chat.setRoom('3-1');
    $location.path('/chatList');
  };
})
