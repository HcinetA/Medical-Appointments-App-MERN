const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const Appointment = require('./appointment.model').schema;

const PatientSchema = new Schema({
    name: {
        type: String,
    },
    phone: { type: Number },
    age: { type: Number },
    information: { type: Number },
    appointments: [{ Appointment }],
    user: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
});
// const Patient = mongoose.model('Patient', patientSchema);
// module.exports = {
//     schema: patientSchema,
//     model: Patient
// }
module.exports = mongoose.model('Patient', PatientSchema);