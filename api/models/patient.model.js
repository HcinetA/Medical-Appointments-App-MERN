const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const Appointment = require('./appointment.model');
const PatientSchema = new Schema({
    name: { type: String },
    phone: { type: Number, unique: true },
    date_of_birth: { type: Date },
    information: { type: String },
    appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment', autopopulate: true }],
    user: { type: Schema.Types.ObjectId },
    invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
    maladie: { type: String },
    allergie: { type: String },
    medication_en_cours: { type: String },
    antecedants_medicaux: { type: String },
    habitute: { type: String },

}, {
    timestamps: true
});



module.exports = mongoose.model('Patient', PatientSchema);