const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
	paid: { type: Number },
	reste: { type: Number, default: 0 },
	note_assistante: { type: String },
	patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
	total: { type: Number },
	acte: { type: String }

}, {
	timestamps: true,
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
