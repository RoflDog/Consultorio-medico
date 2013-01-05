/**
 * @author Daniel Guerra
 */

var _ = require("underscore"),
	Appointment = require("../models/AppointmentModel")
	;
	
exports.searchFree = function (req,res){
	var doctorId = req.params.doctorId;
	var date  = new Date(req.params.date);
	var duration = req.params.duration || 30;	
	Appointment.search(doctorId, date, duration, function ( free){
		res.json(free);
	});
}

exports.searchBusy = function(req,res){
	var doctorId = req.params.doctorId;
	var date = new Date(req.params.date);
	Appointment.getByDate(doctorId, date, function(busy){
		res.json(busy);
	})
}
	
