// Provides websocket functionality
angular.module('shareAustin')
  .factory('Socket', function(socketFactory){
    var socket = socketFactory()
    socket.on('connect', function(){
  });
  return socket;
})
