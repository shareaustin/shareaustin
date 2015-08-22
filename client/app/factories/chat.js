angular.module('shareAustin')

.factory('Chat', function($http){
  var room = '';
  
  // Getter
  function getRoom(){
    return room;
  };
 
  // Setter
  function setRoom(name){
    room = name;
  };

  // Gets a users history of chats
  function userChats(){
    return $http({
      method: "GET",
      url: "/api/user/chats",
    }).then(function(resp){
      console.log(resp.data)
      return resp.data;
    });
  };

  // Create or enters a message room
  function joinOrCreate(data){
    return $http({
      method: "POST",
      url: "/api/chats/find-or-create",
      data: data,
    })
  };

  // Return methods
  return {
    getRoom: getRoom,
    setRoom: setRoom,
    userChats: userChats,
    joinOrCreate: joinOrCreate,
  }
})
