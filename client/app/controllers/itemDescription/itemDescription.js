angular.module('shareAustin')
.controller('ItemDescriptionCtrl', function ($scope, $location, Item, Request, CalEvents) {
  $scope.item = Item.get();
  console.log($scope.item)
  $scope.availItems = Request.items.fetchAvailableItems()

  $scope.rentRedirect = function () {
    $location.path('/transaction')
  }

  $scope.sellerReviews = $scope.item.seller.soldTransactions
    .filter(function (trans) {
      return trans.rating && trans.rating.seller_review
    }).map(function (transaction) {
      return transaction.rating.seller_review
    })
})
