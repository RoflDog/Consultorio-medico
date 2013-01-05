/**
 * @author Daniel Guerra
 */

// The Treatment Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var treatmentSchema = new Schema({
	_id : ObjectId,
	type : { type : String , required : true },
	details : String,
	doctorId : { type: ObjectId , required : true},
	patientId : { type: ObjectId , required : true},
	startDate : Date,
	endDate : Date
});

module.exports = mongoose.model('TreatmentModel', treatmentSchema , 'Treatment');