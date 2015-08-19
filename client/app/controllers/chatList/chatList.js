angular.module('shareAustin')

.controller('ChatListCtrl', function($scope, $state, $location, Chat){
  $scope.title = 'Messages';
 
  Chat.userChats().then(function(chats){
    $scope.buyerChats = chats.buyerChats;
    $scope.sellerChats = chats.sellerChats;
  });

  $scope.joinRoom = function(chat){
    $scope.room = chat.item_id + "-" + chat.buyer_id;
  };
  
  if(Chat.getRoom().length){
    $scope.room = Chat.getRoom();
    $state.transitionTo('chatList.chat')
    console.log('I should be in chat now')
  }
})

.controller('ChatCtrl', function($scope, $location,  Socket){

  Socket.on('connect', function(){
    Socket.emit('enter chat', $scope.room)
  });

  Socket.on('chat history', function(chat){
    console.log('controller received chat: ', chat);
    $scope.chat = chat;
  });

  Socket.on('incoming', function(data){
    //console.log('recieved: ' + data.msg + ' from ' + data.sender)
    console.log('incoming event')
    $scope.chat.messages.push(data);
  });

  $scope.sendMessage = function(){
    Socket.emit('message', $scope.message);
    $scope.message = '';
  }; 

})
