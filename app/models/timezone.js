// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Timezone', new Schema({ 
    name: {type: String, required: 'Name is required.', unique: true},
    city: {type: String, required: 'Name of city is required.'},
    diff: {type: Number, required: 'Difference to GMT is required.'},
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
}));
