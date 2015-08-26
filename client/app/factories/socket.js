// Provides websocket functionality
angular.module('shareAustinSocketFactory', [])
  .factory('Socket', function(socketFactory){
    var socket = socketFactory()
    socket.on('connect', function(){
  });
  return socket;
})
