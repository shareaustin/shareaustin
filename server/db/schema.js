var db = require('./db.js')


module.exports = function(){
	return Promise.all([
		db.knex.schema.hasTable('users').then(function(exists){
		  if(!exists){
			  db.knex.schema.createTable('users', function(user){
			  	user.increments('id').primary();
			  	user.string('first_name');
			  	user.string('last_name');
			  	user.string('username')
			  	user.string('email');
			  	user.string('password');
			  	user.string('photo_url')
			  })
			  .then(function(table){
			  	console.log("Created Table users")
			  });
		  }
		}),

		db.knex.schema.hasTable('items').then(function(exists){
			if(!exists){
				db.knex.schema.createTable('items', function(item){
					item.increments('id').primary();
					item.integer('seller_id').references('id').inTable('users')
					item.string('name');
					item.text('description');
					item.boolean('available');
					item.boolean('active');
					item.string('price_per_hour');
					item.string('price_per_day');
				})
				.then(function(table){
					console.log('Created Table items', table)
				});
			}
		}),

		db.knex.schema.hasTable('transactions').then(function(exists){
			if(!exists){
				db.knex.schema.createTable('transactions', function(transaction){{
					transaction.increments('id').primary();
					transaction.integer('item_id').references('id').inTable('items');
					transaction.integer('buyer_id').references('id').inTable('users');
					//transaction.integer('seller_id').references('id').inTable('users');
					transaction.dateTime('start_date');
					transaction.dateTime('end_date');
					transaction.string('duration');
					transaction.string('price');
					transaction.string('stripe_token');
				}})
				.then(function(table){
					console.log("Created Table transactions ", table)
				});
			}
		}),

		db.knex.schema.hasTable('item_photos').then(function(exists){
			if(!exists){
				db.knex.schema.createTable('item_photos', function(photo){
					photo.increments('id').primary();
					photo.integer('item_id').references('id').inTable('items');
					photo.string('url');
				})
				.then(function(table){
					console.log('Created Table item_photos ', table)
				});
			}
		}),

		db.knex.schema.hasTable('ratings').then(function(exists){
			if(!exists){
				db.knex.schema.createTable('ratings', function(rating){
					rating.increments('id').primary();
					rating.integer('transaction_id').references('id').inTable('transactions');
					rating.integer('seller_rating');
					rating.text('seller_review');
					rating.integer('buyer_rating');
					rating.text('buyer_review');
				})
				.then(function(table){
					console.log('Created Table ratings', table)
				});
			}
		}),


		db.knex.schema.hasTable('chats').then(function(exists){
			if(!exists){
				db.knex.schema.createTable('chats', function(chat){
					chat.increments('id').primary();
					chat.integer('creator_id').references('id').inTable('users');
					chat.integer('guest_id').references('id').inTable('users');
					chat.string('status');
				})
				.then(function(table){
					console.log('Created Table chats ', table)
				});
			}
		}),
		db.knex.schema.hasTable('messages').then(function(exists){
			if(!exists){
				db.knex.schema.createTable('messages', function(message){
					message.increments('id').primary();
					message.integer('chat_id').references('id').inTable('chats');
					message.integer('sender_id').references('id').inTable('users');
					message.integer('receiver_id').references('id').inTable('users');
				})
				.then(function(table){
					console.log('Created Table messages ', table)
				});
			}
		})
	])
}