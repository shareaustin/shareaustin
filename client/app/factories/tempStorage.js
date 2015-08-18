Angular.module('shareAustin')
// getter/setter which stores item information primarily for the itemDesciption view
.factory('Item', function ($http, Upload) {
  var search = {
    term: ""
  }
  var itemDescription = {}
  
  // Getter and setter
  function set(data) {
    itemDescription = data;
  };
  function get() {
   return itemDescription;
  };

  // Upload photo functionality
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

  // Return object with the these function as properties
  return {
   set: set,
   get: get,
   uploadPhoto: uploadPhoto,
   search: search
  }
})

// Getter setter with transaction information used for ratings and review view
.factory("SaveTransaction", function() {
  transactionDescription = {}
  function set(data) {
    transactionDescription = data
  }
  function get() {
    return transactionDescription
  }
  return  { set: set, get: get }
})

