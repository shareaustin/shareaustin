angular.module('shareAustin')

// This file shares $scope with availableItems.js 
// (think of them as the same controller)     
.expandAvailableItems = function($scope, Request, Helpers) {

  //Create array containing map markers
  $scope.markerArray = [];

  //Creates/renders google map with markers, mouse events, and info window 
  $scope.setupMap = function() {

    var mapSettings = {
      zoom      : 13,
      center    : new google.maps.LatLng(30.27415, -97.73996),
      MapTypeId : google.maps.MapTypeId.TERRAIN
    }
    // Creates map and places it in the div with id 'map'
    $scope.map = new google.maps.Map(document.getElementById('map'), mapSettings)

    $scope.map.set('styles', 

      //BEGIN map style array


      [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#716464"},{"weight":"0.01"}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.attraction","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#787878"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"simplified"},{"color":"#a05519"},{"saturation":"-13"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#fcfcfc"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#636363"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"weight":"4.27"},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"on"},{"weight":"0.01"}]},{"featureType":"road.local","elementType":"all","stylers":[{"saturation":"43"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#84afa3"},{"lightness":52}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#7ca0a4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]}]


      //END map style array


    );


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
                              icon     : {
                                url    : 'http://i.imgur.com/sX0Co13.png',
                                scaledSize   : {width: 48, height: 48}
                              }
                            };                      
      var newMark   = new google.maps.Marker(markerSettings)

      //Add the new marker to the markerArray
      $scope.markerArray.push(newMark);
      // console.log("$scope.markerArray", $scope.markerArray);

      // Stores this function to a variable for less typing :)
      var setEvent = google.maps.event.addListener;

      // Mouseover marker event
      setEvent(newMark, 'mouseover', function(event) {
        // custom html string needed to create info window; see factories/helpers 
        var customHtml    = Helpers.createHTMLStr(this.item.name, this.item.price_per_day, this.item.photo_url)
        // Creates info-window, saves it to $scope
        $scope.infoWindow = new google.maps.InfoWindow({content : customHtml, 
                                                        maxWidth: 150         })
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
    }//end for-loop
  }//end setupMap

  // var searchbar = document.getElementById('item-search');

  //     searchbar.addEventListener("keydown", function() {
  //       var searchText = searchbar.value;
  //       for (var i = 0; i < $scope.markerArray.length; i++) {
  //         if ($scope.markerArray[i].item.name.indexOf(searchText) !== -1) {
  //           // console.log(searchText);
  //           // console.table($scope.markerArray[i].item.name);
  //           $scope.markerArray[i].setVisible(true);
  //         } else {
  //           $scope.markerArray[i].setVisible(false);
  //         }
  //       };
  //     })

  //begin updating marker visibility based on filtered search results
  // $scope.updateMarkers = function() {
  //   if ($scope.filteredItems.length === 0) {
  //     for (var i = 0; i < $scope.markerArray.length; i++) {
  //       $scope.markerArray[i].setVisible(true);
  //     }
  //   } else {
  //     for (var i = 0; i < $scope.filteredItems.length; i++) {
  //       if ($scope.markerArray.indexOf($scope.filteredItems[i]) !== -1) {
  //         console.log('match!!!');
  //       }
  //     }
  //   }
  // }
  //end updating marker visibility based on filtered search results
};