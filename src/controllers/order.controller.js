const Order = require('../services/order.service');
const mongoose = require('mongoose');

const createOrder = async (req, res, next) => {
    try {
        const newOrder = req.body;
        await Order.createOrder(newOrder);
        return res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.log('🚀 ~ file: order.controller.js:5 ~ createOrder ~ error:', error);
        next(error);
    }
};

module.exports = { createOrder };
