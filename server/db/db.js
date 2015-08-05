var knex = require('knex')({
  client: 'postgres',
  connection: {
  	host: 'localhost',
  	database: 'shareaustin',
  }
})
module.exports = require('bookshelf')(knex)