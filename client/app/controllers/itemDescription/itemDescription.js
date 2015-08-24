angular.module('shareAustin')
.controller('ItemDescriptionCtrl', function ($scope, $location, Auth, Chat, Item, Request, CalEvents) {
  
  // Get's the item that was clicked from prvious page
  $scope.item = Item.get()

  // Sets user
  Auth.getUser().then(function(user){
    $scope.user = user;
  });
  
  // Fetches all available items
  $scope.availItems = Request.items.fetchAvailableItems()

  // Redirects to transactions page
  $scope.rentRedirect = function () {
    $location.path('/transaction')
  }

  // Reviews - Filters seller reviews by id
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

  // If no reviews, sets a review saying there are no reviews
  if (!$scope.sellerReviews.length) {
   $scope.sellerReviews.push("This Item Hasn't Been Reviewed Yet")
  };

  // Sets up chat room in factory and directs us to that page
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
