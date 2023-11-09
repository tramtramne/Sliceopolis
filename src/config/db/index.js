const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log('Connected to mongoDB');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = { connectDB };
