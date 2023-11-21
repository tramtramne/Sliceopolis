const { NotFoundResponse, BadRequest } = require('../common/error.response');
const { SuccessResponse, CreatedResponse } = require('../common/success.response');
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

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.getAllOrder();
        const response = new SuccessResponse({ metadata: orders });
        return response.send(req, res);
    } catch (error) {
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const { orderId } = req.params || {};
        if (orderId && Object.keys(orderId).length === 0) {
            throw new BadRequest();
        }
        const order = await Order.getOrderById(orderId);
        if (!order) {
            throw new NotFoundResponse();
        }
        const response = new SuccessResponse({ metadata: order });
        return response.send(req, res);
    } catch (error) {
        next(error);
    }
};

const getOrderByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params || {};
        if (userId && Object.keys(userId).length === 0) {
            throw new BadRequest();
        }
        const orders = await Order.getOrder({ id_user: userId });
        const response = new SuccessResponse({ metadata: orders });
        return response.send(req, res);
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrder, getAllOrder, getOrderById, getOrderByUserId };
