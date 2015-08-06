var userHandler = require('./requestHandler/userHandler.js');

module.exports = function (app) {
  app.get('/api/users', userHandler.getUser);

  return app;
}

