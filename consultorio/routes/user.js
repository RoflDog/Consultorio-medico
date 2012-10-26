
/*
 * GET users listing.
 */
 
 // loads model file and engine
var mongoose    = require('mongoose'),
    userModel = require('../models/UsersModel');


exports.list = function(req, res){
    userModel.find({},function(err, docs){
        res.render('user.jade', { title: 'Dashboard', users: docs });
    });
};

exports.add = function(req,res){
  res.render('addUser.jade', {title: 'Agregar Usuario'});
};

exports.index_post = function(req,res){
  user = new userModel();
  user.roles = req.body.roles;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.mail = req.body.mail;
  
  user.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
            console.log('Success!');
            messages.push("Thank you for you new membership !");
        }
        else {
            console.log('Error !');
            errors.push("At least a mandatory field has not passed validation...");
            console.log(err);
        }
    });
  res.render('addUserbla.jade', {title: 'Agregar Usuario'});
};