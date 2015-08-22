var Knex = require('knex');
var URL = require('url');
var pg_server = URL.parse(process.env.DATABASE_URL);
var knex = Knex({
    client: 'pg',
    connection: {
        host: 'ec2-54-197-255-248.compute-1.amazonaws.com',
        port: 5432,
        user: 'zmaussctrrmknq',
        password: 'YwPHckwGgaUqZYw6jbz0a5-DkJ',
        database: 'd5nh25dcv5196i',
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