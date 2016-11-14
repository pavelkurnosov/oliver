var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: String,
    middleInitial: String,
    lastName: String
});

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;