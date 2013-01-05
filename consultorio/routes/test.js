
/*
 * Test Router
 */
 
 // loads utilities
var _ = require('underscore');

exports.appointment = function(req, res){
	var app = require('../models/AppointmentModel');
	app.search(null, null, null, function ( free){
		res.json(free);
	});
	
};
