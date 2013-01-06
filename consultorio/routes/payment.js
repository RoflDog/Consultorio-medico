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
  var payment = new paymentModel(req.body);
  patientModel.findOne({ _id : payment.patientId }, function(err,patient){
		if(!err && patient){
			var	balance = patient.balance - payment.amount;
			patient.balance = balance;
			patient.save(function(err){
				if (!err){
					payment.save(function (err) {
				        messages = [];
				        errors = [];
				        if (!err){
				            console.log('Success!');
							res.json({
								success : true,
								message : 'Payment Succesfully Added',
								payment : payment
							});
				        }
				        else {
				           res.json({
								success : false,
								message : 'Couldn\'t Add The Payment'
							});
				        }
		    		});
	    		}
	    		else {
	    			res.json({
						success : false,
						message : 'Couldn\'t Update The Patient'
					});
	    		}
			});
		} else {
			res.json({
				success : false,
				message : 'PatientId not found'
			});	
		}
  });
	res.json({
		success : false,
		message : 'Couldn\'t Add The Payment'
	});
};

exports.getPayment = function(req,res){
	var id = req.params.id;
	paymentModel.find({_id : new ObjectId(id)} , function(err , payment){
		if (!payment)
			res.json({
				error : true,
				message : "Payment Not Found"
			});
		else{
			res.json({
				payment : payment
			})
		}
	});
};

exports.getPaymentByUser = function(req,res){
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
  var charge = new chargeModel(req.body);
  patientModel.findOne({ _id : charge.patientId }, function(err,patient){
	if(!err && patient){
		var	balance = patient.balance + charge.total;
		patient.balance = balance;
		patient.save(function(err){
			if (!err){
		 		charge.save(function (err) {
			        messages = [];
			        errors = [];
			        if (!err){
						res.json({
							success : true,
							message : 'Charge Succesfully Added',
							charge: charge
						});
			        }
			        else {
			            res.json({
							success : false,
							message : 'Couldn\'t Add The Charge'
						});
			        }
		    	});
			} else {
				res.json({
					success : false,
					message : 'Couldn\'t Update The Patient'
				}); 
			}
		});
	} else {
		res.json({
		success : false,
		message : 'PatientId not found'
		});
	}
  });
};

exports.getCharge = function(req,res){
	var id = req.params.id;
	chargeModel.findOne({_id : new ObjectId(id)} , function(err , charge){
		if (!charge)
			res.json({
				error : true,
				message : "Charge Not Found"
			});
		else{
			res.json({
				charge : charge
			})
		}
	});
};

exports.getChargeByUser = function(req,res){
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