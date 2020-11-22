const mongoose = require('mongoose');
const MaladieSchema = new mongoose.Schema({
    name: { type: String },
});
MaladieSchema.plugin(require('mongoose-autopopulate'));
module.exports = Maladie = mongoose.model('Maladie', MaladieSchema);