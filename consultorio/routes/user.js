
/*
 * GET users listing.
 */
 
 // loads model file and engine
var userModel = require('../models/UsersModel'),
    utils = require('../models/utils');



exports.list = function(req, res){
    userModel.find({},function(err, users){
    	
        res.json({
        	users : users
        });
    });
};

exports.get = function(req,res){
	var id = req.params.id;
	userModel.findOne({_id : id} , function(err , user){
		if (!user)
			res.json({
				error : true,
				message : "User Not Found"
			});
		else{
			res.json({
				user : user
			})
		}
	});
};

exports.update = function(req,res){
	var user = new userModel(req.body);
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
};

exports.delete = function(req,res){
	var id = req.params.id;
  	userModel.remove({ _id : id}, function(err){
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