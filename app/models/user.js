// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    username: {type: String, required: 'Username is required.', unique: true},
    hashedPassword: {type: String, required: 'Password is required.'},
    role: {type: String, required: 'Role is required.'}
}));
