/**
 * @author IsaiasSilva
 */

// The Users Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId   
   ,utils = require('./utils');
;

var userSchema = new Schema({
	_id : ObjectId,
	username : String,
	password : String,
	salt : String,
	active : Boolean,
	firstname : String,
	lastname : String,
	birthdate : Date,
	email : String,
	phone : [{type : String, format : "phone"}],
	address : String,
	roles : [{type : String, enum: ['doctor', 'secretary', 'administrator']}],
	schedule : { start: {type : "number"}, end: {type : "number"} }
});

//Creating method for password validation
userSchema.methods.validatePassword = function (pass){
    return this.password == utils.hash(pass,this.salt);   
};

module.exports = mongoose.model('UserModel', userSchema , 'User');