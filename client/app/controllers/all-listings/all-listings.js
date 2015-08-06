angular.module('shareAustin')

.controller('AllListingsCtrl', function($scope, Request) {
  $scope.listings = [
  {
    name: 'Kayak',
      photo_url: 'http://pics.woodenpropeller.com/kayak10.jpg',
      seller_username: 'kayakBob',
      available: 'true',
      description: 'This is a sweet kayak! Please rent it forever! Dog included!',
      price_per_hour: '$10',
      price_per_day: '$40'
  },
  {
    name: 'Tandem Bike',
      photo_url: 'http://www.atomiczombie.com/plans/tradewinds/TradeWinds%20Recumbent%20Tandem%20Bike%206.jpg',
      seller_username: 'bikerLady',
      available: 'true',
      description: 'Perfect for two people! Warning: do not ride this alone.',
      price_per_hour: '$5',
      price_per_day: '$25'
  }
  ];

  $scope.listing = {
    name: 'Kayak',
      photo_url: 'http://pics.woodenpropeller.com/kayak10.jpg',
      seller_username: 'kayakBob',
      available: 'true',
      description: 'This is a sweet kayak! Please rent it forever! Dog included!',
      price_per_hour: '$10',
      price_per_day: '$40'
  };
})