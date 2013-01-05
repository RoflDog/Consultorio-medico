
/*
 * GET patients listing.
 */
 
 // loads model file and engine
var patientModel = require('../models/PatientsModel'),
	ObjectId = require('mongoose').Types.ObjectId
	_ = require('underscore');



exports.list = function(req, res){
    patientModel.find({},function(err, patients){
        res.json({
        	patients : patients
        });
    });
};

exports.get = function(req,res){
	var id = req.params.id;
	patientModel.findOne({_id : new ObjectId(id)} , function(err , patient){
		if (!patient)
			res.json({
				error : true,
				message : "Patient Not Found"
			});
		else{
			res.json({
				patient : patient
			})
		}
	});
};

exports.update = function(req,res){
	var id = req.params.id;
	patientModel.findOne({ _id : new ObjectId(id) }, function(err,patient){
		if(patient){
			var newval = req.body;
			patient.firstname = newval.firstname || patient.firstname;
			patient.lastname = newval.lastname || patient.lastname;
			patient.birthdate = newval.birthdate || patient.birthdate;
			patient.email = newval.email || patient.email;
			patient.phone = newval.phone || patient.phone;
			patient.address = newval.address || patient.address;
			patient.notes = newval.notes || patient.notes;
			patient.save(function(err){
				if(!err){
					res.json({
						success : true,
						message : "Patient was updated"
					});
				} else {
					res.json({
						success : false,
						message : "Can't update the specified patient"
					});
				}
			});
		} else { 
			res.json({
				success : true,
				message : "Patient Not Found"
			});
		}
	});
};

exports.delete = function(req,res){
	var id = req.params.id;
	patientModel.findOne({ _id : new ObjectId(id) }, function(err,patient){
		if(patient){
			patientModel.remove({ _id : new ObjectId(id)}, function(err){
				if(!err){
					res.json({
						success : true,
						message : "Patient was removed"
					});
				} else {
					res.json({
						success : false,
						message : "Can't remove the specified patient"
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
  patient = new patientModel(req.body);
  
  patient.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
            console.log('Success!');
			res.json({
				success : true,
				message : 'Patient Succesfully Added'
			});
        }
        else {
            console.log('Error !');
            console.log(err);
			res.json({
				success : false,
				message : 'Couldn\'t Add The Patient'
			});
        }
    });
};