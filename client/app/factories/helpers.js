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
          '<div id="content">' +
            '<h3  id="firstHeading" class="firstHeading">' + title + '</h1>'+
            '<div id="bodyContent">'+
              '<p> ' + (price ? "$"+price : "Free!") + '</p>'+  
              '<img src="'+imageUrl+'" height="100" width="100">'+
            '</div>'+
          '</div>'
        return contentString;
      },
    }
    return helperObj
})