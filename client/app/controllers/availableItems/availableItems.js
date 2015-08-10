angular.module('shareAustin')

.controller('AvailableItemsCtrl', function($scope, Request, Item) {

  // $scope.item = {
  //   name: '',
  //     photo_url: '',
  //     seller_username: '',
  //     available: '',
  //     description: '',
  //     price_per_hour: '',
  //     price_per_day: ''
  // };
  $scope.currentItem = {};
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

      for (var i = 0; i < $scope.items.length; i++) {
        var latLong = new google.maps.LatLng($scope.items[i].lat, $scope.items[i].length)
        var newMark = new google.maps.Marker({
          position: latLong,
          title: $scope.items[i].name
        })
        console.log('mark made');
        newMark.setMap($scope.map);

        var mapOptions = {
          zoom: 12,
          // Initially centered at state capital buiding 
          center: new google.maps.LatLng(30.27415, -97.73996),
          mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        console.log(document)
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions)
      }
    })
  };

  // $scope.fetchItem = function ($event) {
  //   Request.items.itemById($event.id).then(function(results) {
  //     console.log("Current Item is ", results)
  //     $scope.currentItem = results
  //     console.log("current item name ", $scope.currentItem.name)
  //   })
  // }
  $scope.updateItem = function ($event) {
    console.log("Event ", $event)
    Item.set($event)
  }
  $scope.fetchAvailableItems();

  // $scope.fetchItem(1)
})

