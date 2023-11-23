const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avtDefault = 'https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp';
const User = new Schema({
    fullname: { type: String, maxLength: 255, required: true },
    phoneNumber: { type: String, maxLength: 15, required: true, unique: true },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length >= 8;
            },
            message: (props) => `Password must be at least 8 characters long!`,
        },
    },
    address: { type: String, maxLength: 255, default: null },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },

    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'USER', 'STAFF'],
        default: 'USER',
    },
});

module.exports = mongoose.model('User', User);
