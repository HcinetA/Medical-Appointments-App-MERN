const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
	paid: { type: Number },
	rest: { type: Number },
	note_assistante: { type: String },
	patient: { type: Schema.Types.ObjectId, ref: 'Patient' },

}, {
	timestamps: true,
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
