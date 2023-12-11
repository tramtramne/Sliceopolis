const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

module.exports = mongoose.model('Store', Store);
