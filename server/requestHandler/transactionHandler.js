var Transaction = require('../model/transaction.js');
var Item = require('../model/item.js');

module.exports = {

  addTransaction : function(req, res) {
    var transaction = req.body;
    console.log(transaction);
    var attr = {
      'item_id'      : transaction.item_id,
      'buyer_id'     : transaction.buyer_id,
      'start_date'   : transaction.start_date,
      'end_date'     : transaction.end_date,
      'stripe_token' : transaction.stripe_token,
      'duration'     : transaction.duration
    }

    //Right now this only calculates total price based on price per hour
    new Item({'id' : transaction.item_id}).fetch()
    .then(function(res) {
      console.log('Item Price Per Hour: ', res.attributes.price_per_hour);
      console.log('Rental Duration in Hours: ', transaction.duration);
      attr.price = res.attributes.price_per_hour * transaction.duration;
      // console.log('Transaction Item Returned: ', res);
    })
    .then(function(res) {
      console.log('Transaction attributes: ', attr);
      new Transaction(attr).save();
    })
    .then(res.json("Transaction added!")) 
  },
  getTransactionById: function(req, res) {
    var transaction_id = req.body.transaction_id;
    Transaction.where({'id': transaction_id }).fetch()
    .then(function (model) {
      console.log("model" + model)
      res.json(model)
    })
  },
}