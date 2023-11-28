const mongoose = require('mongoose');
const { Double } = require('typeorm');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Define a schema for Voucher
const Voucher = new Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
        enum: ['FIXED', 'PERCENTAGE'],
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: Number,
        required: true,
    },
    minimumOrder: {
        type: Number,
        default: 0,
    },
    maximumDiscount: {
        type: Number,
    },
    start_at: {
        type: Date,
        default: Date.now,
    },
    close_at: {
        type: Date,
        default: Date.now,
        validate: {
            validator: function (value) {
                return value >= this.start_at;
            },
            message: 'Start date must be less than close date.',
        },
    },
    used: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
    user_list: {
        type: [
            {
                type: ObjectId,
                ref: 'User',
            },
        ],
        default: [],
    },
});

module.exports = mongoose.model('Voucher', Voucher);
