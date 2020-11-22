const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const PatientSchema = new Schema({
    name: {
        type: String,
    },
    phone: { type: Number },
    date_of_birth: { type: Date },
    information: { type: String },
    appointments: [{ type: Schema.Types.ObjectId, ref: 'Appointment' }],

    user: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
});



module.exports = mongoose.model('Patient', PatientSchema);