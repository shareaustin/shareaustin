var User = require('../model/users.js');
module.exports = {
	getUser: function (req, res) {
		console.log('inside userhandler')
		new User({'id': '1'}).fetch()
		.then(function (model) {
		  res.json(model);
		})
	}
};