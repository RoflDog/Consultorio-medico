/**
 * @author Daniel Guerra
 */

// The Appointment Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var appointmentSchema = new Schema({
	_id : ObjectId,
	date : {type : Date , required : true , unique : true},
	duration : { type : Number , default : 30},
	service : String,
	notes : [String],
	TreatmentId : ObjectId,
	UserId : ObjectId,
	DoctorId : ObjectId,
	PatientId : ObjectId,
	freeTime : String
});

module.exports = { 
	model : mongoose.model('AppointmentModel', appointmentSchema, 'Appointment'),
	
	search : function (doctorId , appointmentDate, duration, done){
		var duration = Math.ceil(duration/30) || 1;
		var query = this.model.find({});
		var free = [];
		this.getByDate(doctorId , appointmentDate,function (results){
			var returnObject = {},
				MINDURATION = 30,
				dModel = require('./UsersModel')
				;
			dModel.findById(doctorId, function(err, doctor){
				var start = doctor.schedule.start,
					end = doctor.schedule.end,
					busy = [];
				_.each(results , function(item){
					var busyTime = new Date(item.date),
						during = item.duration
						;
					while(during > 0){
						busy.push(busyTime);
						during -= 30;
						busyTime = new Date(busyTime);
						busyTime.setMinutes(busyTime.getMinutes()+30);
					}
				});
				var curTime = new Date(appointmentDate);
				curTime.setHours(start);
				curTime.setMinutes(0);
				var endTime = new Date(appointmentDate);
				endTime.setHours(end);
				endTime.setMinutes(0);
				busy.push(endTime);
				while (curTime < endTime){
					var auxTime = new Date(curTime);
					var auxDuration = duration;
					var addIt = true;
					while (auxDuration > 0){	
						if(_.find( busy , function(itsBusy){ return auxTime - itsBusy == 0;})){
							addIt = false;
							break;	
						}
						auxDuration--;
						auxTime.setMinutes(auxTime.getMinutes()+30);
					}
					if (addIt)
						free.push(new Date(curTime));
					curTime.setMinutes(curTime.getMinutes()+30);
				}
				if (_.isFunction(done))
					done(free);
				else
					return free; 
			});
		});
	},
	getByDate : function(dId, ad, done){
		var query = this.model.find({});
		query.$where("this.date.getFullYear() == " + ad.getFullYear());
		query.$where("this.date.getMonth() == " + ad.getMonth());
		query.$where("this.date.getDate() == " + ad.getDate());
		query.exec(function(err, results){
			if (_.isFunction(done)) done(results);
			else return results;
		});
	}
};