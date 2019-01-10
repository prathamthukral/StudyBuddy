var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('buddies', new Schema({
    name: String,
    password: String,
    email: String,
    todos: [{
        title: String,
        completed: Boolean,
        created: Date,
        hidden: Boolean
    }]
},
    {
        versionKey: false
    }
));