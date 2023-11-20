const { NotFoundResponse } = require('../common/error.response');
const { SuccessResponse } = require('../common/success.response');
const Order = require('../services/order.service');

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

const getAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.getAllOrder();
        return res.status(200).json({ data: orders });
    } catch (error) {
        console.log('🚀 ~ file: order.controller.js:5 ~ getAllOrder ~ error:', error);
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.getOrderById(id);
        if (!order) {
            throw new NotFoundResponse();
        }
        const response = new SuccessResponse({ metadata: order });
        return response.send(req, res);
    } catch (error) {
        console.log('🚀 ~ file: order.controller.js:5 ~ getOrderById ~ error:', error);
        next(error);
    }
};

const getOrderByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;  
        const orders = await Order.getOrder({ id_user: id });
        const response = new SuccessResponse({ metadata: orders });
        return response.send(req, res);
    } catch (error) {
        console.log('🚀 ~ file: order.controller.js:45 ~ getOrder ~ error:', error);
        next(error);
    }
};

module.exports = { createOrder, getAllOrder, getOrderById, getOrderByUserId };
