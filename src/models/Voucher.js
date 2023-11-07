const mongoose = require('mongoose');
const { Double } = require('typeorm');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Define a schema for Voucher
const Voucher = new Schema({
    name: {
        type: String,
    },
    min_value: {
        type: Number,
    },
    value: {
        type: Number,
    },
    start_at: {
        type: Date,
        default: Date.now,
        validate: {
            validator: function (value) {
                return value <= this.close_at;
            },
            message: 'Start date must be less than close date.',
        },
    },
    close_at: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        validate: {
            validator: function (value) {
                return value >= this.used;
            },
            message: 'Amount should be greater than or equal to used.',
        },
    },
    used: {
        type: Number,
    },
});

module.exports = mongoose.model('Voucher', Voucher);
