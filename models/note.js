let mongoose = require('mongoose');

// Note schema
let noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

let Note = module.exports = mongoose.model('Note', noteSchema);