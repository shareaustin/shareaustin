angular.module('shareAustin')

.controller('AvailableItemsCtrl', function($scope, Request) {
  
  // $scope.item = {
  //   name: '',
  //     photo_url: '',
  //     seller_username: '',
  //     available: '',
  //     description: '',
  //     price_per_hour: '',
  //     price_per_day: ''
  // };

  $scope.items = [
  // {
  //   name: 'Kayak',
  //     photo_url: 'http://pics.woodenpropeller.com/kayak10.jpg',
  //     seller_username: 'kayakBob',
  //     available: 'true',
  //     description: 'This is a sweet kayak! Please rent it forever! Dog included!',
  //     price_per_hour: '$10',
  //     price_per_day: '$40'
  // },
  // {
  //   name: 'Tandem Bike',
  //     photo_url: 'http://www.atomiczombie.com/plans/tradewinds/TradeWinds%20Recumbent%20Tandem%20Bike%206.jpg',
  //     seller_username: 'bikerLady',
  //     available: 'true',
  //     description: 'Perfect for two people! Warning: do not ride this alone.',
  //     price_per_hour: '$5',
  //     price_per_day: '$25'
  // }
  ];

  $scope.fetchAvailableItems = function() {
    Request.items.fetchAvailableItems()
    .then(function (results){
     $scope.items = results;
      console.log('Items: ', $scope.items);
    })
  };

  $scope.fetchAvailableItems();

})