angular.module('shareAustinCalFactory', [])
  .factory('CalEvents', function(){
  // Initialize
  var calEvents = [];

  /// Setter
  function set(data) {
    calEvents = data;
  };

  // Getter
  function get() {
   return calEvents;
  };

  // Return methods
  return {
   set: set,
   get: get,
  }
})