/**
 * @author DanielAlejandro
 */
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
   
//Creating necessary Schema for Authentication
var userAuthSchema = new Schema({
	username :{type : String , unique : true},
	password : {type : String},
	salt : {type : String},
	roles : [String]
});

//Exporting the model so it can be accesible when required
module.exports = mongoose.model('User',userAuthSchema);
