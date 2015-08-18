Angular.module('shareAustin')
.factory('Auth', function($http){
  var api = {
    user: {},
    getUser: function(){
      return this.user;
    },

    setUser: function(data){
      this.user = data;
    },

    signup: function(user){
      return $http({
        method: 'POST',
        url: '/signup',
        data: user,
      })
      .then(function(resp){
        return resp.data;
      });
    },

    signin: function(user){
      return $http({
        method:'POST',
        url: '/signin',
        data: user,
      })
      .then(function(resp){
        console.log('in auth factory')
        console.log(resp.data)
        return resp.data;
      });
    }
  }
  return {
    signup: api.signup,
    signin: api.signin,
    getUser: api.getUser,
    setUser: api.setUser
  };
})

.factory('Item', function ($http, Upload) {
  var search = {
    term: ""
  }
  var itemDescription = {}
  function set(data) {
    itemDescription = data;
  };

  function get() {
   return itemDescription;
  };

  function uploadPhoto(item_id, file){
    console.log('in item util. item id is ', item_id)

    Upload.upload({
      url: 'api/user/item/photos/upload',
      file: file,
      fields: {item_id: item_id}
    })
    .progress(function (evt){
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
    })
    .success(function (data, status, headers, config){
      console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
      itemDescription.photo_url = data.photo_url;
    })
    .error(function (data, status, headers, config){
      console.log('error status: ' + status);
    });
  }

  return {
   set: set,
   get: get,
   uploadPhoto: uploadPhoto,
   search: search
  }
})