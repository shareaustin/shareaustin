angular.module('shareAustin')

.controller('ChatListCtrl', function($scope, $location){
  $scope.title = 'Chat Room';
  $scope.rentChats = [
    {item_id: '3', buyer_id:'1'},
    {item_id: '4', buyer_id:'1'},
  ];

  $scope.sellChats = [
    {item_id: '1', buyer_id:'2'},
    {item_id: '2', buyer_id:'2'},
  ];
  
  //$scope.currentChat = $scope.rentChats[0];
  $scope.joinRoom = function(chat){
    $scope.room = chat.item_id + "-" + chat.buyer_id;
  };
})

.controller('ChatCtrl', function($scope, $location,  Socket){

  Socket.on('connect', function(){
    Socket.emit('enter chat', $scope.room)
  });

  Socket.on('chat history', function(chat){
    console.log('controller received chat: ', chat);
    $scope.chat = chat;
  });

  Socket.on($scope.chat, function(msg){

    console.log(msg);
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

  $scope.leave = function(){
   $location.path('/chatList'); 
  };
})
