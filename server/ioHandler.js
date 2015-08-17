module.exports = function(io){
  var rooms = {};
  io.on('connect', function(socket){
    console.log('new user connection...');
    console.log(socket.id);
    io.emit('welcome', 'everyone');
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
    socket.on('resp', function(data){
      console.log('client responded saying ', JSON.stringify(data));
      var room = data;
      socket.room = room;
      socket.join(room);
      console.log(socket.adapter.rooms);
      console.log('emitting event ' + room + '\n')
      //socket.broadcast.to(room).emit(room, 'user joined room ' + room);
    });
    socket.on('disconnect', function(){
      console.log(socket.id);

      io.sockets.in(socket.room).emit(socket.room, socket.id + ' left room');
      console.log('client disconnected..' + socket.room + '\n');
    });
  
  });
  

};
