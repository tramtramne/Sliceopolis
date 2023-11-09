const mongoose = require('mongoose');
const { Double } = require('typeorm');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Order = new Schema({
    product: {
        id_product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
        price: {
            type: Number,
            default: function () {
                return this.model('Product')
                    .findOne({ _id: this.product.id_product }, 'price')
                    .then((product) => {
                        return product.price;
                    });
            },
        },
        amount: {
            type: Number,
            required: true,
        },
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
    address: {
        type: String,
        default: function () {
            return this.model('User')
                .findOne({ _id: this.id_user }, 'address')
                .then((user) => {
                    return user.address;
                });
        },
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    phoneNumber: {
        type: String,
        default: function () {
            return this.model('User')
                .findOne({ _id: this.id_user }, 'phoneNumber')
                .then((user) => {
                    return user.phoneNumber;
                });
        },
    },
    id_voucher: {
        type: Schema.Types.ObjectId,
    },
});
console.log('Schema for YourModel:');
console.dir(Order.schema, { depth: null });
mongoose.connection.collection('Order');
module.exports = mongoose.model('Order', Order);
