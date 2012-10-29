/**
 * @author DanielAlejandro
 */
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId
   ,utils = require('./utils');
   
//Creating necessary Schema for Authentication
var userAuthSchema = new Schema({
	username :{type : String , unique : true},
	password : {type : String},
	salt : {type : String},
	roles : [String]
});

//Creating method for password validation
userAuthSchema.methods.validatePassword = function (pass){
    return this.password == utils.hash(pass,this.salt);   
};

//Exporting the model so it can be accesible when required
module.exports = mongoose.model('UserAuth',userAuthSchema , 'User');
