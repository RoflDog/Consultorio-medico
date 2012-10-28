
/*
 * GET users listing.
 */
 
 // loads model file and engine
var mongoose    = require('mongoose'),
    crypto		= require('crypto'),
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
  
  var countPass = new Number(Math.random()*4).toFixed(0);
  var salt;
  console.log(countPass);
  switch (countPass)
  {
  case 1: 
    salt = "sha1";
    break;
  case 2: 
    salt = "md5";
    break;
  case 3: 
    salt = "sha256";
    break;
  default: 
    salt = "sha512";
  }
  console.log("Hashing salt is: " + salt);
  user.salt = salt;
  var pass = crypto.createHash(salt).update(req.body.password).digest("hex");
  console.log("Encrypted pass: " + pass);
  user.password = pass;
  
  user.save(function (err) {
        messages = [];
        errors = [];
        if (!err){
            console.log('Success!');
            messages.push("Usuario Agregado");
        }
        else {
            console.log('Error !');
            errors.push("Hubo un error al agregar un usuario");
            console.log(err);
        }
    });
  res.redirect('/user');
};