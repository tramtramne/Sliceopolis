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
    id_staff: Joi.string(),
    status: Joi.string().valid('DELIVERING', 'DELIVERED').default('DELIVERING'),
    shipped_at: Joi.date().when('status', { is: 'DELIVERED', then: Joi.date().required() }),
});

const orderSchema = Joi.object({
    items: Joi.array().items(itemSchema).required(),
    total: Joi.number(),
    payment: paymentSchema,
    delivery: deliverySchema,
    address: Joi.string().required(),
    id_user: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    id_voucher: Joi.string(),
});

const validateOrder = (order) => {
    const { error } = orderSchema.validate(order);
    console.log('🚀 ~ file: order.validator.js:37 ~ validateOrder ~ error:', error);
    return error;
};

module.exports = { validateOrder };
