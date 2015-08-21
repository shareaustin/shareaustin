angular.module('shareAustin')

.controller('ChatListCtrl', function($scope, $state, $location, Auth, Chat, Item, Request){
  $scope.title = 'Messages';
  $scope.user = Auth.getUser();
  
  Chat.userChats().then(function(chats){
    $scope.buyerChats = chats.buyerChats;
    $scope.sellerChats = chats.sellerChats;
  });

  $scope.joinRoom = function(chat){
    $scope.room = chat.item_id + "-" + chat.buyer_id;
    Item.set(chat.item)
  };
  
  if(Chat.getRoom().length){
    $scope.room = Chat.getRoom();
    Chat.setRoom('');
    $state.go('chatList.chat')
  }
})

.controller('ChatCtrl', function($scope, $location, $state, $window, Item, Socket){
  $scope.item = Item.get();
  $scope.$on('$stateChangeStart', function(){
      $window.location.reload();
  });

  Socket.on('connect', function(){
    Socket.emit('enter chat', $scope.room)
  });

  Socket.on('chat history', function(chat){
    $scope.chat = chat;
  });

  Socket.on('incoming', function(data){
    $scope.chat.messages.push(data);
  });

  $scope.sendMessage = function(){
    Socket.emit('message', {
      msg: $scope.message,
      sender: $scope.user.id,
    });
    $scope.message = '';
  }; 
  
  $scope.leave = function(){
    $state.go('chatList');
  };
})
