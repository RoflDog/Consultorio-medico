
/*
 * GET users listing.
 */
 
 // loads model file and engine
var userModel = require('../models/UsersModel'),
    utils = require('../models/utils'),
	ObjectId = require('mongoose').Types.ObjectId,
	_ = require('underscore')
	;



exports.list = function(req, res){
    userModel.find({},function(err, rawUsers){
    	var users = [];
    	var blackList = ['password' , 'salt'];
    	_.each(rawUsers , function(user){
    		users.push(_.omit(user.toObject(), 'password' , 'salt'));
    	}); 
    	
        res.json({
        	users : users
        });
    });
};

exports.get = function(req,res){
	var id = req.params.id;
	var blackList = ['password' , 'salt'];
	userModel.findOne({_id : new ObjectId(id)} , function(err , user){
		if (!user)
			res.json({
				error : true,
				message : "User Not Found"
			});
		else{
			
			res.json({
				user : _.omit(user.toObject(),blackList)
			})
		}
	});
};

exports.update = function(req,res){
	var id = req.params.id;
	userModel.findOne({ _id : new ObjectId(id) }, function(err,user){
		if(user){
			user.username = req.body.username;
			user.save(function(err){
				if(!err){
					res.json({
						success : true,
						message : "User was updated"
					});
				} else {
					res.json({
						success : false,
						message : "Can't update the specified user"
					});
				}
			});
		} else { 
			res.json({
				success : true,
				message : "User Not Found"
			});
		}
	});
};

exports.delete = function(req,res){
	var id = req.params;
	userModel.findOne({ _id : new ObjectId(id) }, function(err,user){
		if(user){
			userModel.remove({ _id : new ObjectId(id)}, function(err){
				if(!err){
					res.json({
						success : true,
						message : "User was removed"
					});
				} else {
					res.json({
						success : false,
						message : "Can't remove the specified user"
					});
				}
			})
		} else {
			res.json({
				success : true,
				message : "User Not Found"
			});
		}
	})
};


exports.add = function(req,res){
  //For now with this is enough
  user = new userModel(req.body);
  
  var salt = utils.createSalt();
  user.salt = salt;
  var pass = utils.hash(req.body.password , user.salt);
  user.password = pass;
  
  user.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
            console.log('Success!');
			res.json({
				success : true,
				message : 'User Succesfully Added'
			});
        }
        else {
            console.log('Error !');
            console.log(err);
			res.json({
				sucess : false,
				message : 'Couldn\'t Add The User'
			});
        }
    });
};