const { NotFoundResponse, BadRequest, ErrorResponse } = require('../common/error.response');
const { SuccessResponse, CreatedResponse } = require('../common/success.response');
const orderService = require('../services/order.service');
const Order = require('../models/Order');
const User = require('../models/User');
const { validateID } = require('../validators/index');
const { paginate } = require('../utils/pagination.js');
const { PAGE_SIZE } = require('../constants/index.js');
const { applyVoucherToOrder } = require('./voucher.controller');
const { validateOrder } = require('../validators/order.validator');
const totalPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
        total += item.price * item.quantity;
    });
    return total;
};
const createOrder = async (req, res, next) => {
    const body = req.body || {};
    if (body && Object.keys(body).length === 0) {
        throw new BadRequest();
    }
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
        throw new NotFoundResponse('User not found');
    }
    var newOrder = {
        items: body.items,
        total: totalPrice(body.items),
        created_at: Date.now(),
        update_at: Date.now(),
        payment: body.payment || {
            method: 'COD',
            status: 'UNPAID',
        },
        delivery: body.delivery || {
            id_staff: null,
            status: 'DELIVERING',
            shipped_at: null,
        },

        address: body.address || user.address,
        phoneNumber: body.phoneNumber || user.phoneNumber,
        voucher_code: body.voucher_code || null,
        id_user: id,
    };
    const { value, error } = validateOrder(newOrder);
    if (error) {
        throw new BadRequest(error);
    }
    newOrder = value;
    const result = await applyVoucherToOrder(newOrder.total, newOrder.voucher_code, newOrder.id_user);
    if (result.code === 404) {
        return next(new ErrorResponse(result.message, 404));
    }
    newOrder.total = result.metadata;
    const order = await orderService.createOrder(newOrder);
    const response = new CreatedResponse({ metadata: order });
    return response.send(req, res);
};

const getAllOrder = async (req, res, next) => {
    const page = parseInt(req.query.page) >= 0 ? parseInt(req.query.page) : 1;
    const result = await paginate(Order, parseInt(page), parseInt(PAGE_SIZE));

    if (!result) {
        const error = new NotFoundResponse('Order not found');
        return next(error);
    }
    return new SuccessResponse({
        metadata: result,
    }).send({ req, res });
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

const updateDeliveryStatus = async (req, res, next) => {
    if (!req.params.orderId) {
        next(new BadRequest());
    }
    const idStaff = req.user.id || {};

    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);
    if (!order) {
        next(new NotFoundResponse('Order not found'));
    }
    if (idStaff.toString() !== order.id_staff.toString()) {
        next(new ErrorResponse('Unauthorized', 401));
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
