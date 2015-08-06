var userHandler = require('./requestHandler/userHandler.js');
var itemHandler = require('./requestHandler/itemHandler.js')

module.exports = function (app) {
  app.get('/api/users', userHandler.getUserDashboard);
  app.get('/api/availableItems', itemHandler.getAvailableItems);
  app.post('/api/addItem', itemHandler.addItem);

  return app;
}

