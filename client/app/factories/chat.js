angular.module('shareAustin')

.factory('Chat', function($http){
  var room = '';
  function getRoom(){
    return room;
  };
 
  function setRoom(name){
    room = name;
  };

  function userChats(){
    return $http({
      method: "GET",
      url: "/api/user/chats",
    }).then(function(resp){
      console.log(resp.data)
      return resp.data;
    });
  };

  function joinOrCreate(data){
    return $http({
      method: "POST",
      url: "/api/chats/find-or-create",
      data: data,
    })
  };

  return {
    getRoom: getRoom,
    setRoom: setRoom,
    userChats: userChats,
    joinOrCreate: joinOrCreate,
  }
})
