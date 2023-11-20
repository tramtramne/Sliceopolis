const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    productList: {
        type: [
            {
                id_product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                },
                size: {
                    type: String,
                    enum: ['SMALL', 'MEDIUM', 'LARGE'],
                    ref: 'Product',
                },
                price: {
                    type: Number,
                },
                amount: {
                    type: Number,
                    required: true,
                },
            },
        ],
        default: [],
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
        paid_at: {
            type: Date,
        }, //
    },
    delivery: {
        id_staff: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        status: {
            type: String,
            enum: ['DELIVERING', 'DELIVERIED'],
            default: 'DELIVERING',
        },
        shipped_at: {
            type: Date,
        },
    },
    address: {
        type: String,
        required: true,
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    phoneNumber: {
        type: String,
    },
    id_voucher: {
        type: Schema.Types.ObjectId,
    },
});

mongoose.connection.collection('Order');
module.exports = mongoose.model('Order', Order);
