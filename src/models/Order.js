const mongoose = require('mongoose');
const { Double } = require('typeorm');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Order = new Schema({
    product: {
        id_product: ObjectId,
        amount: Number,
    },
    total: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    close_at: {
        type: Date,
        default: Date.now,
    },

    payment: {
        method: {
            type: String,
            enum: ['MOMO', 'VNPAY', 'CASH'],
            default: 'CASH',
        },
        status: {
            type: String,
            enum: ['UNPAID', 'PAID'],
            default: 'UNPAID',
        },
    },
    delivery: {
        id_staff: {
            type: ObjectId,
        },
        status: {
            type: String,
            enum: ['DELIVERING', 'DELIVERIED'],
            default: 'DELIVERING',
        },
    },
    id_user: ObjectId,
    id_voucher: ObjectId,
});
console.log('Schema for YourModel:');
console.dir(Order.schema, { depth: null });
mongoose.connection.collection('Order');
module.exports = mongoose.model('Order', Order);
