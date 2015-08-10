angular.module('shareAustin')

.controller('AvailableItemsCtrl', function($scope, Request, Item) {

  $scope.currentItem = {};
  $scope.items = [];

  $scope.setupMap = function() {

    // Austin view centered on capitol building
    var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(30.27415, -97.73996),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    // Places map in container with id 'map'
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions)

    // For each item, place a marker corresponding to its latitude and longitude
    for (var i = 0; i < $scope.items.length; i++) {
      // Set coordinates
      var latLng = new google.maps.LatLng($scope.items[i].lat, $scope.items[i].lng)
      var markerData = {
                          position : latLng,
                          title    : $scope.items[i].name
                        };
      // Create marker, set on map
      var newMark = new google.maps.Marker(markerData)
      newMark.setMap($scope.map);
    }
  }

  // Fetches all available items for display
  $scope.fetchAvailableItems = function() {
    Request.items.fetchAvailableItems()    
      .then(function (results){
        $scope.items = results;
      })
  };

  // Changes item selected for detailed viewing
  $scope.updateItem = function ($event) {
    console.log("Event ", $event)
    Item.set($event)
  }

  // Immediately invoked with page
  $scope.fetchAvailableItems();
  $scope.setupMap();
})
