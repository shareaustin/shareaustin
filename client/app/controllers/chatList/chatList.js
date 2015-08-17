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
    $scope.chat = chat.item_id + chat.buyer_id;
  };
})

.controller('ChatCtrl', function($scope, $location,  Socket){
  $scope.leave = function(){
   $location.path('/chatList'); 
  };

  Socket.on('welcome', function(msg){
    console.log('controller received welcome event: ', msg);
    Socket.emit('resp', $scope.chat);
  });

  Socket.on($scope.chat, function(msg){

    console.log(msg);
  });
})
