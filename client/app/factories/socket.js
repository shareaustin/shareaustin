// Provides websocket functionality
Angular.module('shareAustin')
  .factory('Socket', function(socketFactory){
    var socket = socketFactory()
    socket.on('connect', function(){
    console.log('client connected...');
    console.log(arguments);
  });
  return socket;
})