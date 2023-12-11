const Joi = require('joi');

const itemSchema = Joi.object({
    id_item: Joi.string().required(),
    size: Joi.string().valid('SMALL', 'MEDIUM', 'LARGE').required(),
    quantity: Joi.number().integer().min(1).required(),
    price: Joi.number().required(),
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
    items: Joi.array().items(itemSchema).required().min(1),
    total: Joi.number(),
    payment: paymentSchema,
    delivery: deliverySchema,
    address: Joi.string().required(),
    id_user: Joi.string().required(),
    created_at: Joi.date().required(),
    update_at: Joi.date().required(),
    phoneNumber: Joi.string()
        .length(10)
        .pattern(/(\+84|0[3|5|7|8|9])+([0-9]{8})\b/),
    voucher_code: Joi.string().allow(null),
});

const validateOrder = (order) => {
    const { value, error } = orderSchema.validate(order);
    return { value, error };
};

module.exports = { validateOrder };
