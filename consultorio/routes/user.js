
/*
 * GET users listing.
 */
 
 // loads model file and engine
var userModel = require('../models/UsersModel'),
    utils = require('../models/utils');



exports.list = function(req, res){
    userModel.find({},function(err, docs){
        res.render('user.jade', { title: 'Dashboard', users: docs,  error : req.query['error'] });
    });
};

exports.add = function(req,res){
  res.render('addUser.jade', {title: 'Agregar Usuario'});
};

exports.index_post = function(req,res){
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
			res.redirect('/user');
        }
        else {
            console.log('Error !');
            console.log(err);
			res.redirect('/user?error=true');
        }
    });
};