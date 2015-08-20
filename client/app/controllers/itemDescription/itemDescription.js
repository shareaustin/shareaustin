angular.module('shareAustin')
.controller('ItemDescriptionCtrl', function ($scope, $location, Chat, Item, Request, CalEvents) {
  $scope.item = Item.get()

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
    Chat.setRoom('3-1');
    Request.user.fetchUser().then(function(user){
      var room = $scope.item.id + "-" + user.id;
      console.log('item description controller fetching user')
      console.log(room)
      Chat.joinOrCreate({
        item_id: $scope.item.id,
        buyer_id: user.id
      })
    })
    $location.path('/chatList');
  };
})
