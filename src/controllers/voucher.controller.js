const { model } = require('mongoose');
const voucherService = require('../services/voucher.service');
const { SuccessResponse, CreatedResponse } = require('../common/success.response');
const { ErrorResponse, BadRequest, NotFoundResponse } = require('../common/error.response');
const { validateID } = require('../validators');
const Voucher = model('Voucher');
const { paginate } = require('../utils/pagination.js');
const { PAGE_SIZE } = require('../constants/index.js');
const { validateVoucher } = require('../validators/voucher.validator');
const getAllVoucher = async (req, res, next) => {
    const page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 1 ? parseInt(req.query.limit) : PAGE_SIZE;
    const result = await paginate(Voucher, parseInt(page), parseInt(limit));

    if (!result) {
        const error = new NotFoundResponse('Voucher not found');
        throw error;
    }
    return new SuccessResponse({
        metadata: result,
    }).send({ req, res });
};
const getVoucherById = async (req, res, next) => {
    if (!req.params) {
        throw new BadRequest('Bad request');
    }
    const { id } = req.params;
    if (!validateID(id)) {
        throw new ErrorResponse('Invalid product ID', 422);
    }

    const data = await voucherService.getVoucherById(id);
    if (!data) {
        throw new NotFoundResponse('Voucher not found');
    }
    return new SuccessResponse({
        metadata: data,
    }).send({ res });
};

const applyVoucherToOrder = async (totalPrice, voucher_code, idUser) => {
    const voucher = await Voucher.findOne({ code: voucher_code }).exec();

    if (!voucher || voucher.start_at > Date.now() || voucher.close_at < Date.now()) {
        throw new NotFoundResponse('Voucher not found');
    }

    const order = await voucherService.applyVoucherToOrder(totalPrice, voucher, idUser);

    if (order.status === 'error') {
        throw new ErrorResponse(order.message, 403);
    } else {
        return {
            metadata: order.totalPrice,
            message: order.message,
            code: 200,
        };
    }
};

const createVoucher = async (req, res, next) => {
    const body = req.body || {};

    if (Object.keys(body).length === 0) {
        throw new BadRequest('Body is empty');
    }
    const { value, error } = await validateVoucher(body);
    if (error) {
        throw new BadRequest(error);
    }
    const voucher = await voucherService.createVoucher(value);
    return new CreatedResponse({
        metadata: voucher,
    }).send({ res });
};
module.exports = { getVoucherById, applyVoucherToOrder, getAllVoucher, createVoucher };
