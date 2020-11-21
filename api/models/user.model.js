const mongoose = require('mongoose');
const roleSchema = require('./role.model').schema;
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true,
        index: true,
        unique: true,
        sparse: true
    },
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },

    avatar: {
        type: String
    },
    role: {
        String
    },
    history: {
        type: Array,
        default: []
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date

}, {
    timestamps: true
})
UserSchema.statics.findByRole = function(name, cb) {
    return this.find({ role: name }, cb);
};


module.exports = User = mongoose.model('User', UserSchema);