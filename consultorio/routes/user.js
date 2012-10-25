
/*
 * GET users listing.
 */
 
 // loads model file and engine
var mongoose    = require('mongoose'),
    memberModel = require('../models/UsersModel');


exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.prueba = function(req,res){
  res.send("esto es una prueba de users");
};