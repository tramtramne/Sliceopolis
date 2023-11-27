const Joi = require('joi');

const itemSchema = Joi.object({
    id_item: Joi.string().required(),
    item_name: Joi.string().required().min(1).max(255),
    size: Joi.string().valid('SMALL', 'MEDIUM', 'LARGE').required(),
    price: Joi.number().positive().min(0).required(),
    quantity: Joi.number().integer().min(1).required(),
});

const paymentSchema = Joi.object({
    method: Joi.string().valid('MOMO', 'VNPAY', 'CASH').default('CASH'),
    status: Joi.string().valid('UNPAID', 'PAID').default('UNPAID'),
    paid_at: Joi.date().when('status', { is: 'PAID', then: Joi.date().required() }),
});

const deliverySchema = Joi.object({
    id_staff: Joi.string().allow(null),
    status: Joi.string().valid('DELIVERING', 'DELIVERED').default('DELIVERING').allow(null),
    shipped_at: Joi.date().when('status', { is: 'DELIVERED', then: Joi.date() }).allow(null),
});

const orderSchema = Joi.object({
    items: Joi.array().items(itemSchema).required(),
    total: Joi.number(),
    payment: paymentSchema,
    delivery: deliverySchema,
    address: Joi.string().required(),
    id_user: Joi.string().required(),
    created_at: Joi.date().required(),
    update_at: Joi.date().required(),
    phoneNumber: Joi.string().required(),
    voucher_code: Joi.string().allow(null),
});

const validateOrder = (order) => {
    const { error } = orderSchema.validate(order);

    return error;
};

module.exports = { validateOrder };
