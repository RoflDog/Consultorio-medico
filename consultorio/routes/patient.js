
/*
 * GET patients listing.
 */
 
 // loads model file and engine
var patientModel = require('../models/PatientsModel'),
    utils = require('../models/utils'),
	ObjectId = require('mongoose').Types.ObjectId;



exports.list = function(req, res){
    patientModel.find({},function(err, patients){
    	
        res.json({
        	patients : patients
        });
    });
};

exports.get = function(req,res){
	var id = req.params.id.substring(3);
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
	var id = req.params.id.substring(3);
	patientModel.findOne({ _id : new ObjectId(id) }, function(err,patient){
		if(patient){
			patient.patientname = req.body.patientname;
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
	var id = req.params.id.substring(3);
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
  
  var salt = utils.createSalt();
  patient.salt = salt;
  var pass = utils.hash(req.body.password , patient.salt);
  patient.password = pass;
  
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
				sucess : false,
				message : 'Couldn\'t Add The patient'
			});
        }
    });
};

exports.addView = function(req,res){
	res.render('addpatient.jade',{title: "hola"});
}