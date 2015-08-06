var User = require('../model/user.js');
module.exports = {
	getUserDashboard: function (req, res) {

		var user = req.user;

		console.log('inside userhandler')
		new User({'id': user.id}).fetch()
		.then(function (model) {
		  res.json(model);
		})
	}
};