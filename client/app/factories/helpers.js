angular.module('shareAustin')

  // This factory is for miscellaneous non-request helper function
  .factory('Helpers', function(){

    var helperObj = {

      // Makes the address appropriate to send to as endpath for google api
      urlifyAddress : function(address) {
        console.log(address)
        var result = "address="
        address = address.split(" ")
        for (var i = 0; i < address.length; i++) {
          result += (i < address.length-1) ? address[i]+"+" : address[i]
        }
        return result
      },

      // Simplifies google response, giving only properties we need
      simplifyLocation : function(googleResponse) {
        return {
          address : googleResponse.results[0].formatted_address,
          lat     : googleResponse.results[0].geometry.location.lat,
          lng     : googleResponse.results[0].geometry.location.lng,
        }
      },

      // Creates html string necessary for construction of info window
      createHTMLStr: function(title, price, imageUrl) {
        var contentString =
          '<div id="content" class="maps-wrapper">' +
              '<img src="'+imageUrl+'" class="mapMarkerImg img-responsive">'+
            '<div id="bodyContent" class="maps-content text-center">'+
              '<span  id="firstHeading" class="maps-title">' + title + '</span>'+
              '<span class="maps-price"> ' + (price ? "$"+price : "Free!") + '</span>'+
            '</div>'+
          '</div>'
        return contentString;
      },
    }

    // Return these functions, of course
    return helperObj
})