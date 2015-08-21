angular.module('shareAustin')

.controller('ChatListCtrl', function($scope, $state, $location, Chat, Item, Request){
  $scope.title = 'Messages';
  Request.user.fetchUser().then(function(user){
    $scope.user = user;
    console.log($scope.user)
  });
 
  Chat.userChats().then(function(chats){
    $scope.buyerChats = chats.buyerChats;
    $scope.sellerChats = chats.sellerChats;
  });

  $scope.joinRoom = function(chat, id){
    $scope.room = chat.item_id + "-" + chat.buyer_id;
    Item.set(chat.item)
    console.log('the id of person in chat is ', id)
  };
  
  if(Chat.getRoom().length){
    $scope.room = Chat.getRoom();
    $state.go('chatList.chat')
    console.log('I should be in chat now')
  }
})

.controller('ChatCtrl', function($scope, $location, $state, $window, Item, Socket){
  $scope.item = Item.get();
  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
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
