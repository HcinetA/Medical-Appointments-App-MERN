const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
	paid: { type: Number },
	rest: { type: Number },
	note_assistante: { String },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
