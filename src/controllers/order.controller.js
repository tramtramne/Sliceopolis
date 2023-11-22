const { NotFoundResponse, BadRequest } = require('../common/error.response');
const { SuccessResponse, CreatedResponse } = require('../common/success.response');
const orderService = require('../services/order.service');

const createOrder = async (req, res, next) => {
    const body = req.body || {};
    if (body && Object.keys(body).length === 0) {
        throw new BadRequest();
    }
    const newOrder = {
        items: body.items,
        total: body.total,
        created_at: body.created_at,
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
    const response = new SuccessResponse({ metadata: orders });
    return response.send(req, res);
};

const getOrderById = async (req, res, next) => {
    const { orderId } = req.params || {};
    if (orderId && Object.keys(orderId).length === 0) {
        throw new BadRequest();
    }
    const order = await orderService.getOrderById(orderId);
    if (!order) {
        throw new NotFoundResponse();
    }
    const response = new SuccessResponse({ metadata: order });
    return response.send(req, res);
};

const getOrderByUserId = async (req, res, next) => {
    const { userId } = req.params || {};
    if (userId && Object.keys(userId).length === 0) {
        throw new BadRequest();
    }
    const orders = await orderService.getOrder({ id_user: userId });
    const response = new SuccessResponse({ metadata: orders });
    return response.send(req, res);
};

module.exports = { createOrder, getAllOrder, getOrderById, getOrderByUserId };
