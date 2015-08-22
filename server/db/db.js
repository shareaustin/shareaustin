var knex = require('knex')({
  client: 'postgres',
  connection: {
  	client: 'pg',
    connection: DATABASE_URL
  }
})

var db = require('bookshelf')(knex);
db.plugin('registry');

module.exports = db;

require('../model/user.js');
require('../model/item.js');
require('../model/itemPhoto.js');
require('../model/transaction.js');
require('../model/favorite.js');
require('../model/rating.js');
require('../model/chat.js');
require('../model/message.js');