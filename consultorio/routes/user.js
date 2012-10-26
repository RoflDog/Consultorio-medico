
/*
 * GET users listing.
 */
 
 // loads model file and engine
var mongoose    = require('mongoose'),
    memberModel = require('../models/UsersModel');


exports.list = function(req, res){
  res.render("user", { title: "Usuarios" } );
};

exports.add = function(req,res){
  res.("esto es una prueba de users");
};