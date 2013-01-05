/**
 * @author Daniel Guerra
 */

// The Appointment Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var appointmentSchema = new Schema({
	_id : ObjectId,
	date : {type : Date , required : true},
	duration : { type : Number , required : true},
	service : String,
	notes : [String],
	treatmentId : ObjectId,
	UserId : ObjectId,
	DoctorId : ObjectId,
	PatientId : ObjectId,
	freeTime : String
});

module.exports = mongoose.model('AppointmentModel', appointmentSchema, 'Appointment');