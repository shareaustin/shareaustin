angular.module('shareAustin')
.controller('ItemDescriptionCtrl', function ($scope, $location, Auth, Chat, Item, Request, CalEvents) {
  $scope.item = Item.get()
  $scope.user = Auth.getUser();

  // console.log($scope.item)
  $scope.availItems = Request.items.fetchAvailableItems()

  $scope.rentRedirect = function () {
    $location.path('/transaction')
  }

  // Reviews - Filters seller reivews by id
  if ($scope.item.seller) { 
    $scope.sellerReviews = $scope.item.seller.soldTransactions
      .filter(function (trans) {
        return trans.rating.seller_review && trans.item_id === $scope.item.id
      }).map(function (transaction) {
        return transaction.rating.seller_review
      })
  } else {
    $scope.sellerReviews = [];
  }

  if (!$scope.sellerReviews.length) {
   $scope.sellerReviews.push("This Item Hasn't Been Reviewed Yet")

  };

  $scope.chatRedirect = function(){
    var room = $scope.item.id + "-" + $scope.user.id;
    Chat.setRoom(room);
    console.log('item description controller fetching user')
    console.log(room)
    Chat.joinOrCreate({
      item_id: $scope.item.id,
      buyer_id: $scope.user.id
    })
    $location.path('/chatList');
  };
})
