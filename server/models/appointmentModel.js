const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		doctorId: {
			type: String,
			required: true,
		},
		doctorInfo: {
			type: Object,
			required: true,
		},
		userInfo: {
			type: Object,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: 'Pending',
		},
	},
	{ timestamps: true }
);

const appointmentModel = mongoose.model('appointment', appointmentSchema);
module.exports = appointmentModel;
