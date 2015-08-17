var db = require('./db.js')


module.exports = function(){
  return db.knex.schema.hasTable('users').then(function(exists){
    if(!exists){
      db.knex.schema.createTable('users', function(user){
        user.increments('id').primary();
        user.string('first_name');
        user.string('last_name');
        user.string('username');
        user.string('email');
        user.string('password');
        user.text('photo_url');
      })
      .createTable('items', function(item){
        item.increments('id').primary();
        item.integer('seller_id').references('id').inTable('users');
        item.string('name');
        item.text('description');
        item.boolean('available');
        item.boolean('active');
        item.string('price_per_hour');
        item.string('price_per_day');
        item.string('address');
        item.varchar('lat');
        item.varchar('lng');
        item.text('photo_url');
      })
      .createTable('favorites', function (favorite){
        favorite.integer('user_id').references('id').inTable('users');
        favorite.integer('item_id').references('id').inTable('items');
        favorite.primary(['user_id', 'item_id']);
      })
      .createTable('transactions', function (transaction){
        transaction.increments('id').primary();
        transaction.integer('item_id').references('id').inTable('items');
        transaction.integer('buyer_id').references('id').inTable('users');
        transaction.dateTime('start_date');
        transaction.dateTime('end_date');
        transaction.string('duration');
        transaction.string('price');
        transaction.string('stripe_token');
        transaction.string('status');
      })
      .createTable('item_photos', function (photo){
        photo.increments('id').primary();
        photo.integer('item_id').references('id').inTable('items');
        photo.text('photo_url');
      })
      .createTable('ratings', function (rating){
        rating.integer('transaction_id').references('id').inTable('transactions').primary();
        rating.integer('item_id').references('id').inTable('items');
        rating.integer('seller_rating');
        rating.text('seller_review');
        rating.integer('buyer_rating');
        rating.text('buyer_review');

      })
      .createTable('chats', function (chat){
         chat.integer('item_id')
         chat.integer('buyer_id').references('id').inTable('users');
         chat.string('status');
         chat.primary(['item_id', 'buyer_id']);
      })
      .createTable('messages', function (message){
        message.increments('id').primary();
        message.integer('chat_item_id').notNullable();
        message.integer('chat_buyer_id').notNullable();
	//message.integer(['chat_item_id', 'chat_buyer_id']);
        message.text('text');
        message.boolean('seen');
      })
      .then(function(){
        console.log('Created Tables...')
      });      
    }
  })
}
