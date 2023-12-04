const Joi = require('joi');
const { VOUCHER } = require('../constants/index');

const voucherSchema = Joi.object({
    code: Joi.string().required(),
    type: Joi.string().valid('FIXED', 'PERCENTAGE').required(),
    value: Joi.number().required(),
    start_at: Joi.date().required(),
    close_at: Joi.date().required(),
    minimumOrder: Joi.number().required(),
    maximumDiscount: Joi.number().required(),
    user_list: Joi.array().items(Joi.string()).default([]),
    used: Joi.number().default(0),
    description: Joi.string(),
    name: Joi.string().min(VOUCHER.MIN_NAME_LENGTH).max(VOUCHER.MAX_NAME_LENGTH).required(),
});

const validateVoucher = (voucher) => {
    const { error, value } = voucherSchema.validate(voucher);
    return { error, value };
};
module.exports = {
    validateVoucher,
};
