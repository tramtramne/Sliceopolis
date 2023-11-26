const { NotFoundResponse, BadRequest, ErrorResponse } = require('../common/error.response');
const { SuccessResponse, CreatedResponse } = require('../common/success.response');
const orderService = require('../services/order.service');
const Order = require('../models/Order');
const User = require('../models/User');
const { validateID } = require('../validators/index');
const createOrder = async (req, res, next) => {
    const body = req.body || {};
    if (body && Object.keys(body).length === 0) {
        throw new BadRequest();
    }
    const newOrder = {
        items: body.items,
        total: body.total,
        created_at: Date.now(),
        payment: body.payment,
        delivery: body.delivery,
        address: body.address,
        phoneNumber: body.phoneNumber,
        id_voucher: body.id_voucher,
        id_user: req.user.id,
    };
    const order = await orderService.createOrder(newOrder);
    const response = new CreatedResponse({ metadata: order });
    return response.send(req, res);
};

const getAllOrder = async (req, res) => {
    const orders = await orderService.getAllOrder();
    const response = new SuccessResponse({
        metadata: {
            data: orders,
            totalLength: orders.length,
        },
    });
    return response.send(req, res);
};

const getOrderById = async (req, res, next) => {
    const { orderId } = req.params || {};
    if (orderId && Object.keys(orderId).length === 0) {
        throw new BadRequest();
    }

    const { id } = req.user || {};
    if (!validateID(id)) {
        throw new ErrorResponse('Invalid user ID', 422);
    }
    const user = await User.findById(id);
    const order = await orderService.getOrderById(orderId);
    if (!order) {
        throw new NotFoundResponse();
    }

    if (order.id_user.toString() !== id && user.role !== 'ADMIN' && user.role !== 'STAFF') {
        throw new ErrorResponse('Unauthorized', 401);
    }

    const response = new SuccessResponse({ metadata: order });
    return response.send(req, res);
};

const updateDeliveryStatus = async (req, res) => {
    if (!req.params.orderId) {
        next(new BadRequest());
    }

    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);
    if (!order) {
        next(new NotFoundResponse('Order not found'));
    }

    if (order.delivery.status === 'DELIVERING') {
        order.delivery.status = 'DELIVERED';
    } else if (order.delivery.status === 'DELIVERED') {
        order.delivery.status = 'DELIVERING';
    }
    if (order.delivery.status === 'DELIVERED') {
        order.delivery.shipped_at = new Date();
    }

    await order.save();
    return new SuccessResponse({
        message: 'Change successfully',
        metadata: order,
    }).send(req, res);
};

module.exports = { createOrder, getAllOrder, getOrderById, updateDeliveryStatus };
