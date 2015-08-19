angular.module('shareAustin')

.factory('Chat', function($http){
  function userChats(){
    return $http({
      method: "GET",
      url: "/api/user/chats",
    }).then(function(resp){
      console.log(resp.data)
      return resp.data;
    });
  };
  return {
    userChats: userChats,
  }
})
