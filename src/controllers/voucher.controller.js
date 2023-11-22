const { model } = require('mongoose');
const voucherService = require('../services/voucher.service');
const { SuccessResponse } = require('../common/success.response');
const { ErrorResponse, BadRequest, NotFoundResponse } = require('../common/error.response');
const { validateID } = require('../validates');
const Voucher = model('Voucher');

const getVoucherById = async (req, res, next) => {
    if (!req.params) {
        return next(new BadRequest('Bad request'));
    }
    const { id } = req.params;
    if (!validateID(id)) {
        return next(new ErrorResponse('Invalid product ID', 422));
    }

    const data = await voucherService.getVoucherById(id);
    if (!data) {
        return next(new NotFoundResponse('Product not found'));
    }
    return new SuccessResponse({
        metadata: data,
    }).send({ res });
};

const applyVoucherToOrder = async (req, res, next) => {
    const { totalPrice, voucherCode, idUser } = req.body || {};

    const voucher = await Voucher.findOne({ code: voucherCode }).exec();
    if (!voucher) {
        console.log('Voucher not found');
        return next(new ErrorResponse('Voucher not found', 404));
    }

    if (voucher.start_at > Date.now()) {
        console.log('Now is before start_at');
        return next(new ErrorResponse('Voucher not found', 404));
    }
    if (voucher.close_at < Date.now()) {
        console.log('Now is after close_at');
        return next(new ErrorResponse('Voucher not found', 404));
    }

    const order = await voucherService.applyVoucherToOrder(totalPrice, voucher, idUser);
    if (order.status === 'error') {
        return next(new ErrorResponse(order.message, 403));
    } else {
        return new SuccessResponse({
            metadata: order.totalPrice,
            message: order.message,
            code: 200,
        }).send({ res });
    }
};
module.exports = { getVoucherById, applyVoucherToOrder };
