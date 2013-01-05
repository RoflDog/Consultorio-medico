/*
 * GET payments listing.
 */
 // loads model file and engine
var patientModel = require('../models/PatientsModel'),
	paymentModel = require('../models/PaymentModel'),
	chargeModel = require('../models/ChargeModel'),
    ObjectId = require('mongoose').Types.ObjectId
	_ = require('underscore');
	
exports.addPayment = function(req,res){
  //For now with this is enough
  payment = new paymentModel(req.body);
  patientModel.findOne({ _id : payment.patientId }, function(err,patient){
		var	balance = patient.balance - payment.amount;
		patient.balance = balance;
		patient.firstname = patient.firstname;
		patient.lastname = patient.lastname;
		patient.birthdate = patient.birthdate;
		patient.email = patient.email;
		patient.phone = patient.phone;
		patient.address = patient.address;
		patient.notes = patient.notes;
		patient.save(function(err){
				if(!err){
					
				} else {
					
				}
			});
  });
  payment.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
            console.log('Success!');
			res.json({
				success : true,
				message : 'Payment Succesfully Added'
			});
        }
        else {
            console.log('Error !');
            console.log(err);
			res.json({
				success : false,
				message : 'Couldn\'t Add The Payment'
			});
        }
    });
};

exports.getPayment = function(req,res){
	var id = req.params.id;
	paymentModel.find({patientId : new ObjectId(id)} , function(err , payments){
		if (!payments)
			res.json({
				error : true,
				message : "Patient Not Found"
			});
		else{
			res.json({
				payments : payments
			})
		}
	});
};

exports.addCharge = function(req,res){
  //For now with this is enough
  charge = new chargeModel(req.body);
  patientModel.findOne({ _id : charge.patientId }, function(err,patient){
		var	balance = patient.balance + charge.total;
		patient.balance = balance;
		patient.firstname = patient.firstname;
		patient.lastname = patient.lastname;
		patient.birthdate = patient.birthdate;
		patient.email = patient.email;
		patient.phone = patient.phone;
		patient.address = patient.address;
		patient.notes = patient.notes;
		patient.save(function(err){
				if(!err){
					
				} else {
					
				}
			});
  });
  charge.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
            console.log('Success!');
			res.json({
				success : true,
				message : 'Charge Succesfully Added'
			});
        }
        else {
            console.log('Error !');
            console.log(err);
			res.json({
				success : false,
				message : 'Couldn\'t Add The Charge'
			});
        }
    });
};

exports.getCharge = function(req,res){
	var id = req.params.id;
	chargeModel.find({patientId : new ObjectId(id)} , function(err , charges){
		if (!charges)
			res.json({
				error : true,
				message : "Patient Not Found"
			});
		else{
			res.json({
				charges : charges
			})
		}
	});
};