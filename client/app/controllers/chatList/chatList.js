angular.module('shareAustin')

.controller('ChatListCtrl', function($scope, $state, $location, Auth, Chat, Item, Request){
  // Set title and user
  $scope.title = 'Messages';
  $scope.hideMessageList = false;

  Auth.getUser().then(function(user){
    $scope.user = user;
  });

  // Fetch the users chats, save them to $scope
  Chat.userChats().then(function(chats){
    $scope.buyerChats = chats.buyerChats;
    $scope.sellerChats = chats.sellerChats;
  });

  // Sets up a new chat room by and goes to it
  $scope.joinRoom = function(chat){
    $scope.hideMessageList = true;
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
  // Gets the item beings  chatted about
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
  // Allows user to send a message
  $scope.sendMessage = function(){
    Socket.emit('message', {
      msg: $scope.message,
      sender: $scope.user.id,
    });
    $scope.message = '';
  };

  // Allows user to leave a chat
  $scope.leave = function(){
    $scope.hideMessageList = false;
    $state.go('chatList');
  };
})
