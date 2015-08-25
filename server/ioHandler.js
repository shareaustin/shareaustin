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
        withRelated: ['messages.sender'],
      })
      .then(function(chat){
        socket.chat = chat.id;
        socket.emit('chat history', chat);
      })
    });

    socket.on('message', function(data){
      console.log('received: ', data);
      console.log(socket.room);
      var room = parseRoom(socket.room);
      new Message({
        chat_id: socket.chat, 
        sender_id: data.sender,
        text: data.msg, 
        seen: true
      }).save().then(function(msg){
        return msg.load(['sender']);
      }).then(function(msg){
        io.sockets.in(socket.room).emit('incoming', msg)
      });
    });

    socket.on('disconnect', function(){
      console.log(socket.id);

      io.sockets.in(socket.room).emit(socket.room, socket.id + ' left room');
      console.log('client disconnected..' + socket.room + '\n');
    });
  
  });

};
