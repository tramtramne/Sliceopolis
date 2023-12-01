const mongoose = require('mongoose');
const { Double } = require('typeorm');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Define a schema for Store
const Store = new Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    staff_list: {
        type: [{ ref: 'User' }],
        default: [],
    },
});

module.exports = mongoose.model('Store', Store);
