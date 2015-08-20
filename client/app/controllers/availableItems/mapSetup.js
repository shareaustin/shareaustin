angular.module('shareAustin')

// This file shares $scope with availableItems.js
// (think of them as the same controller)
.expandAvailableItems = function($scope, Request, Helpers, $filter) {

  //Creates/renders google map with markers, mouse events, and info window
  $scope.setupMap = function() {

    var mapSettings = {
      zoom      : 13,
      center    : new google.maps.LatLng(30.27415, -97.73996),
      MapTypeId : google.maps.MapTypeId.TERRAIN
    }
    // Creates map and places it in the div with id 'map'
    $scope.map = new google.maps.Map(document.getElementById('map'), mapSettings)
    $scope.markerArray = [];
    // Creates a google map pin/marker for each item in scope
    for (var i = 0; i < $scope.items.length; i++) {
      // Latitude & Longitude
      var latLng = new google.maps.LatLng($scope.items[i].lat, $scope.items[i].lng)

      // **Note: item is not a googlemap property; but stored here to associate markers
      //   with items (later, this.item refers to a marker's item)
      var markerSettings = {
                              position : latLng,
                              map      : $scope.map,
                              item     : $scope.items[i], //**See note
                            };
      var newMark   = new google.maps.Marker(markerSettings)

      // Stores this function to a variable for less typing :)
      var setEvent = google.maps.event.addListener;

      // Mouseover marker event
      setEvent(newMark, 'mouseover', function(event) {
        // custom html string needed to create info window; see factories/helpers
        var customHtml    = Helpers.createHTMLStr(this.item.name, this.item.price_per_day, this.item.photo_url)
        // Creates info-window, saves it to $scope
        $scope.infoWindow = new google.maps.InfoWindow({
          content : customHtml,
          maxWidth: 250
        })
        $scope.infoWindow.open($scope.map, this) // <-- Open it in the map, at 'this' marker's location
      });

      // When the mouse leaves a marker, close the info window
      setEvent(newMark, 'mouseout', function(event) {
        $scope.infoWindow.close();
      });

      // On click, loads that marker's item to details page and navigates to that page
      setEvent(newMark, 'click', function(event)  {
        $scope.loadDetailedView(this.item); // this.item comes from line 28
      });
    $scope.markerArray.push(newMark)  
    }//end for-loop
  }//end setupMap
  
  var searchbar = document.getElementById('searchBar');

  // on keyup, filter map markers!
  searchbar.addEventListener("keyup", function() {
    $scope.filterMap()
  })

  // Filters map pins based on search bar
  $scope.filterMap = function() {

    var searchText = searchbar.value;
    var filteredItems = $filter('filter')($scope.items, {name: searchText})
    
    for (var i = 0; i < $scope.markerArray.length; i++) {
      $scope.markerArray[i].setVisible(false);
      
      for (var j = 0; j < filteredItems.length; j++ ) {
        if (filteredItems[j].id === $scope.markerArray[i].item.id) {
          $scope.markerArray[i].setVisible(true);
        }
      }
    }
  }  

};

