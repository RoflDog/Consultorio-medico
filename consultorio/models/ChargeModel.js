/**
 * @author Daniel Guerra
 */

// The Charge Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var chargeSchema = new Schema({
	_id : ObjectId,
	detail : String,
	date : Date,
	total : Number,
	userId : { type: ObjectId , required : true},
	itemId : { type: ObjectId , required : true},
	patientId : { type: ObjectId , required : true}
	
});

module.exports = mongoose.model('ChargeModel', chargeSchema , 'Charge');