var Chat = require('./model/chat.js');
var Message = require('./model/message.js');

function parseRoom(room){
  return {
    item_id: room.match(/\d+/)[0],
    buyer_id: room.match(/-\d+/)[0].slice(1)
  }
};

module.exports = function(io){
  io.on('connect', function(socket){
    console.log('new user connection...');
    io.emit('welcome', 'everyone');

    socket.on('enter chat', function(chat){
      var room = parseRoom(chat);
      socket.room = chat;  
      socket.join(chat);
      new Chat({'item_id': room.item_id, 'buyer_id': room.buyer_id}).fetch({
        withRelated: ['messages'],
      })
      .then(function(chat){
        console.log(socket.id + ' entered chat in the promise' + socket.room);
        console.log(JSON.stringify(chat) + '\n');
        socket.chat = chat.id;
        socket.emit('chat history', chat);
      })
    });

    socket.on('message', function(msg){
      console.log('received: ', msg);
    //  console.log(socket.adapter.rooms);
      console.log(socket.room);
      var room = parseRoom(socket.room);
      new Message({
        chat_id: socket.chat, text: msg, seen: true
      }).save().then(function(msg){
        console.log(msg.attributes)
        io.sockets.in(socket.room).emit('incoming', msg)
        //io.sockets.in(socket.room).emit('incoming',  msg.attributes)
      });
    });
    socket.on('disconnect', function(){
      console.log(socket.id);

      io.sockets.in(socket.room).emit(socket.room, socket.id + ' left room');
      console.log('client disconnected..' + socket.room + '\n');
    });
  
  });
  

};
