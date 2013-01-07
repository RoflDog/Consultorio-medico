/**
 * @author Daniel Guerra
 */

// The Payment Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var paymentSchema = new Schema({
	_id : ObjectId,
	detail: String,
	date: { type :Date , default : Date.now},
	amount: Number,
	patientId: ObjectId,
	userId : ObjectId
});

module.exports = mongoose.model('PaymentModel', paymentSchema , 'Payment');