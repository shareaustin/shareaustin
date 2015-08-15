angular.module('shareAustin')
  .factory('CalEvents', function(){

  var calEvents = [];

  function set(data) {
    calEvents = data;
  };

  function get() {
   return calEvents;
  };

  return {
   set: set,
   get: get,
  }
})