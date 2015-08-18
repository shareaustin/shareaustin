angular.module('shareAustin')
  .factory('Helpers', function(){

    var helperObj = {
      urlifyAddress : function(address) {
        console.log(address)
        var result = "address="
        address = address.split(" ")
        for (var i = 0; i < address.length; i++) {
          result += (i < address.length-1) ? address[i]+"+" : address[i]
        }
        return result
      },
      simplifyLocation : function(googleResponse) {
        return {
          address : googleResponse.results[0].formatted_address,
          lat     : googleResponse.results[0].geometry.location.lat,
          lng     : googleResponse.results[0].geometry.location.lng,
        }
      },

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
    return helperObj
})
