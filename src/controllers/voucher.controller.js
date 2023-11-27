const { model } = require('mongoose');
const voucherService = require('../services/voucher.service');
const { SuccessResponse } = require('../common/success.response');
const { ErrorResponse, BadRequest, NotFoundResponse } = require('../common/error.response');
const { validateID } = require('../validators');
const Voucher = model('Voucher');
const { paginate } = require('../utils/pagination.js');
const { PAGE_SIZE } = require('../constants/index.js');

const getAllVoucher = async (req, res, next) => {
    const page = parseInt(req.query.page) >= 0 ? parseInt(req.query.page) : 1;
    const result = await paginate(Voucher, parseInt(page), parseInt(PAGE_SIZE));
    if (!result) {
        const error = new NotFoundResponse('Voucher not found');
        return next(error);
    }
    return new SuccessResponse({
        metadata: result,
    }).send({ req, res });
};
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
        return next(new NotFoundResponse('Voucher not found'));
    }
    return new SuccessResponse({
        metadata: data,
    }).send({ res });
};

const applyVoucherToOrder = async (totalPrice, voucher_code, idUser) => {
    console.log(totalPrice, voucher_code, idUser);
    const voucher = await Voucher.findOne({ code: voucher_code }).exec();
    console.log(123456789, voucher);
    if (!voucher || voucher.start_at > Date.now() || voucher.close_at < Date.now()) {
        console.log('Voucher not found');
        return {
            message: 'Voucher not found',
            code: 404,
        };
    }

    const order = voucherService.applyVoucherToOrder(totalPrice, voucher, idUser);

    if (order.status === 'error') {
        return new ErrorResponse(order.message, 403);
    } else {
        return {
            metadata: order.totalPrice,
            message: order.message,
            code: 200,
        };
    }
};
module.exports = { getVoucherById, applyVoucherToOrder, getAllVoucher };
