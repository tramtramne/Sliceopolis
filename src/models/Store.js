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
    revenue: {
        type: Number,
        default: null,
    },
});

module.exports = mongoose.model('Store', Store);
