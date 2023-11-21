const mongoose = require('mongoose');
const { Double } = require('typeorm');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
    name: { type: String, require: true },
    image: { type: String, require: true },
    sizes: [
        {
            size: {
                type: String,
                enum: ['SMALL', 'MEDIUM', 'LARGE'],
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: true,
        enum: ['PIZZA', 'DRINK', 'OTHERS'],
    },
    status: {
        type: String,
        enum: ['SOLDOUT', 'STOCKING'],
    },
    description: {
        type: String,
    },
    sold: {
        type: Number,
    },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    slug: { type: String },
});

module.exports = mongoose.model('Product', Product);
