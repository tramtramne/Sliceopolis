const { model } = require('mongoose');
const voucherService = require('../services/voucher.service');

const getVoucherById = async (req, res, next) => {
    if (!req.params) {
        throw new BadRequest('Bad request');
    }
    const { id } = req.params;
    const data = await voucherService.getVoucherById(id);
    if (!data) {
        throw new NotFoundResponse('Product not found');
    }
    return new SuccessResponse({
        metadata: data,
    }).send({ res });
};

module.exports = { getVoucherById };
