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
    honoraire: { type: String },
    status: { type: Boolean, default: false, required: false },
    motif: { type: String },
    diagnostic: { type: String },
    analyses: { type: String },
    notes_consultation: { type: String },

}, {
    timestamps: true,
    discriminatorKey: 'kind'
});

module.exports = Appointment = mongoose.model('Appointment', AppointmentSchema);