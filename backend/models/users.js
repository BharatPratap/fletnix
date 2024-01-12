const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    emailId: {type: String, required: true},
    password: {type: String, required: true},
    registeredOn: {type: Date, required: true},
});

module.exports = mongoose.model('User', userSchema);