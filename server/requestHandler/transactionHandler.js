var Transaction = require('../model/transaction.js');
var User = require('../model/user.js');
var Item = require('../model/item.js');
var stripe = require("stripe")("sk_test_eayPxkGdSjeMUXzvbPqZKKg8");
var mandrill = require('node-mandrill')('zUM87mq0xNnY-grgIoEQdQ');
var moment = require('moment');

module.exports = {

  addTransaction : function(req, res) {
    var transaction = req.body;
    var transactionResult;
    // // Get the credit card details submitted by the form
    var attr = {
      'item_id'      : transaction.item_id,
      'buyer_id'     : transaction.buyer_id,
      'start_date'   : transaction.start_date,
      'end_date'     : transaction.end_date,
      'stripe_token' : transaction.stripe_token,
      'duration'     : transaction.duration,
      'status'       : transaction.status
    }
    //Right now this only calculates total price based on price per hour
    new Item({'id' : transaction.item_id}).fetch()
    .then(function(res) {
      // console.log('Item Price Per Hour: ', res.attributes.price_per_hour);
      console.log('Rental Duration in Days: ', transaction.duration);
      attr.price = res.attributes.price_per_day * transaction.duration;
      // console.log('Transaction Item Returned: ', res);
     
      // Get the credit card details submitted by the form
      var stripeToken = req.body.stripe_token;
      // Send the amount to charge to Stripe
      var charge = stripe.charges.create({
        amount: attr.price * 100, // amount in cents, again
        currency: "usd",
        source: stripeToken,
        description: "Example charge"
      }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
          // The card has been declined
        } else {
          //The transaction was successful
        }
      });

    })
    //Store the new transaction in the database
    .then(function(res) {
      transactionResult = new Transaction(attr).save();
      console.log('New transaction record: ', transactionResult._boundTo.attributes);
      return transactionResult._boundTo.attributes
    })
    //Send the response back to the client
    .then(function(transaction){
      //Get the buyer's email address from the item id
      User.where({'id':transaction.buyer_id}).fetch()
      .then(function(user){
      // console.log('Lookup of transaction buyer: ', user.attributes);
      var buyer = user.attributes;
      //Change start_date string to ISO string for moment formatting
      var momentStartDate = new Date(transaction.start_date);
      momentStartDate = momentStartDate.toISOString();
      //Send an email receipt of the transaction
      mandrill('/messages/send', {
          message: {
              to: [{email: buyer.email, name: buyer.first_name + " " + buyer.last_name}],
              from_email: 'payment@shareaustin.com',
              subject: "ShareAustin - Payment Confirmation",
              text: "Congratulations, " + buyer.first_name + "! Your ShareAustin rental was approved. You have been charged $" + transaction.price + ".00 for your rental, which will begin on " + moment(momentStartDate).format("dddd","MMMM") + ", " + moment(momentStartDate).format("MM-DD-YYYY") + ". Enjoy! -- The ShareAustin Team"
          }
      }, function(error, response)
      {
          //uh oh, there was an error
          if (error) console.log( JSON.stringify(error) );

          //everything's good, lets see what mandrill said
          else console.log("Response from Mandrill server: ", response);
      });
      });
      res.json(transaction)
    })
  },

  getTransactionById: function(req, res) {
    var transaction_id = req.body.transaction_id;
    Transaction.where({'id': transaction_id }).fetch()
    .then(function (model) {
      console.log("model" + model)
      res.json(model)
    })
  },
  getItemTransactions: function(req, res) {
    console.log("getItemTransactions request: ", req.body);
    var item_id = req.body.item_id;
    var today = req.body.today;
    Transaction.where({'item_id': item_id }).fetchAll()
    .then(function (model) {
      console.log("model" + model)
      res.json(model)
    })
  }, 
  updateTransaction: function(req, res) {
    var attr = req.body;
    new Transaction({id : attr.id}).save(attr, {patch: true})
    .then(res.json("Transaction updated!"))
  }
}


