/**
 * @author Daniel Guerra
 */

var _ = require("underscore"),
	ObjectId = require('mongoose').Types.ObjectId,
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
	});
}


exports.list = function(req, res){
	query = Appointment.model.find({});
	if (req.query)
		_.each(req.query , function (value, key){
			query.where(key).equals(value);
		});
    query.exec(function(err, apps){
        res.json({
        	appointments : apps
        });
    });
};

exports.get = function(req,res){
	var id = req.params.id;
	Appointment.model.findOne({_id : new ObjectId(id)} , function(err , appointment){
		if (!appointment)
			res.json({
				error : true,
				message : "Appointment Not Found"
			});
		else{
			res.json({
				appointment : appointment
			})
		}
	});
};

exports.update = function(req,res){
	var id = req.params.id;
	Appointment.model.findOne({ _id : new ObjectId(id) }, function(err,appointment){
		if(appointment){
			var newval = req.body;
			appointment.service = newval.service || appointment.service;
			appointment.notes = newval.notes || appointment.notes;
			appointment.TreatmentId = newval.TreatmentId || appointment.TreatmentId;
			appointment.UserId = newval.UserId || appointment.UserId;
			appointment.DoctorId = newval.DoctorId || appointment.DoctorId;
			appointment.PatientId = newval.PatientId || appointment.PatientId;
			appointment.freeTime = newval.freeTime || appointment.freeTime;
			appointment.save(function(err){
				if(!err){
					res.json({
						success : true,
						message : "Appointment was updated",
						appointment : appointment
					});
				} else {
					res.json({
						success : false,
						message : "Can't update the specified appointment"
					});
				}
			});
		} else { 
			res.json({
				success : true,
				message : "Appointment Not Found"
			});
		}
	});
};

exports.delete = function(req,res){
	var id = req.params.id;
	Appointment.model.findOne({ _id : new ObjectId(id) }, function(err,appointment){
		if(appointment){
			Appointment.model.remove({ _id : new ObjectId(id)}, function(err){
				if(!err){
					res.json({
						success : true,
						message : "Appointment was removed"
					});
				} else {
					res.json({
						success : false,
						message : "Can't remove the specified appointment"
					});
				}
			})
		} else {
			res.json({
				success : true,
				message : "Patient Not Found"
			});
		}
	})
};


exports.add = function(req,res){
  //For now with this is enough
  appointment = new Appointment.model(req.body);
  appointment.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
			res.json({
				success : true,
				message : 'Appointment Succesfully Added',
				appointment : appointment
			});
        }
        else {
			res.json({
				success : false,
				message : 'Couldn\'t Add The Appointment'
			});
        }
    });
};
