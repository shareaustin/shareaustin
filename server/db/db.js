var Knex = require('knex');
var URL = require('url');
var pg_server = URL.parse(process.env.DATABASE_URL);
var knex = Knex({
    client: 'pg',
    connection: {
        host: pg_server.hostname,
        port: pg_server.port,
        // user: pg_server.auth.split(':')[0],
        // password: pg_server.auth.split(':')[1],
        database: 'DATABASE_URL',
        ssl: true
    }
});

// var knex = require('knex')({
//   client: 'postgres',
//   connection: {
//   	client: 'pg',
//     connection: DATABASE_URL
//   }
// })

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