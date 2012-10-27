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

//Creating method for password validation
userAuthSchema.methods.validatePassword = function (pass){
    //Falta implementar la logica requerida cuando se vaya a usar el hashing
    if (this.password == pass) 
        return true;
    return false;  
};

//Exporting the model so it can be accesible when required
module.exports = mongoose.model('UserAuth',userAuthSchema , 'User');
