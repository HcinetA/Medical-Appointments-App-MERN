const mongoose = require('mongoose');
const User = require('./user.model').schema;
const Schema = mongoose.Schema;

const AppointmentSchema = new mongoose.Schema({
    daySchedule: { type: String },
    date: { type: Date, required: false },
    time: { type: String },
    doctor: { type: Schema.Types.ObjectId, ref: 'User' },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    acte: { type: String },
    notes: { type: String },
    honoraire: { type: String },
    status: { type: Boolean, default: false, required: false }
}, {
    timestamps: true,
    discriminatorKey: 'kind'
});

module.exports = Appointment = mongoose.model('Appointment', AppointmentSchema);