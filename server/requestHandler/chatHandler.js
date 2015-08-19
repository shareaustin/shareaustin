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
};
