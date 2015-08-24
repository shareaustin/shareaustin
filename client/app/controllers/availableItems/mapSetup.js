angular.module('shareAustinAvailable', [])

// This file shares $scope with availableItems.js
// (think of them as the same controller)
.expandAvailableItems = function($scope, Request, Helpers, $filter) {

  //Creates/renders google map with markers, mouse events, and info window
  $scope.setupMap = function() {

    // Settings
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
      // Creates the marker (but is not yet displayed)
      var newMark   = new google.maps.Marker(markerSettings)

      // Stores google...adListener to a short variable for less typing :)
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

        // Opens info window for viewing
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

    // Save markers to scope for later manipulation 
    $scope.markerArray.push(newMark)  

    }//end for-loop
  }//end setupMap
  
  // Searchbar element of dom
  var searchbar = document.getElementById('searchBar');

  // on keyup, filter map markers!
  searchbar.addEventListener("keyup", function() {
    $scope.searchFilter()
  })

  // Makes all markers visible on map
  $scope.showAll = function() {
    for (var i = 0; i < $scope.markerArray.length; i++ ) {
      $scope.markerArray[i].setVisible(true)
    }
  }

  // Takes an array of item, and makes the map only show markers associated with those items
  $scope.showOnly = function (items) {
    for (var i = 0; i < $scope.markerArray.length; i++) {
      $scope.markerArray[i].setVisible(false)
      for (var j = 0; j < items.length; j++) {
        if (items[j].id === $scope.markerArray[i].item.id) {
          $scope.markerArray[i].setVisible(true);
        }
      }
    }
  }

  // Changes marker visibilty based on input in search bar
  $scope.searchFilter = function() {
    var searchText = searchbar.value;
    var filteredItems = $filter('filter')($scope.items, {name: searchText})    
    $scope.showOnly(filteredItems)
  }  

};

