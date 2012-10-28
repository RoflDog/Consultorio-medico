/**
 * @author IsaíasSilva
 */

// The Users Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	_id : ObjectId,
	username : String,
	password : String,
	salt : String,
	active : Boolean,
	firstname : String,
	lastname : String,
	birthDate : Date,
	email : String,
	phone : [{type : String, format : "phone"}],
	address : String,
	roles : [{type : String, enum: ['doctor', 'secretary', 'administrator']}],
	schedule : { start: {type : "number"}, end: {type : "number"} }
});

module.exports = mongoose.model('User', userSchema);