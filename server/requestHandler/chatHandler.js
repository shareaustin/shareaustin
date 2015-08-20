var Chat = require('../model/chat.js');
var Message = require('../model/message.js');

module.exports = {
  getMessages: function(req, res) {
    console.log('in chatHandler getMessages')
    new Chat().fetch({
      withRelated: ['messages']
    }).then(function(chat){
      res.json(chat);
    }) 
  },

  findOrCreate: function(req, res){
    new Chat({
      item_id: req.body.item_id,
      buyer_id: req.body.buyer_id,
    }).save().then(function(chat){
      console.log('----created new chat\n')
      res.json(chat);
    }).catch(function(err){
      console.log('*******chat already exists\n')
      res.json(req.body);
    })                 
  },
};
