const Joi = require('joi');
const { PRODUCT } = require('../constants/index');
const productValidation = Joi.object({
    name: Joi.string().required().min(PRODUCT.MIN_NAME_LENGTH).max(PRODUCT.MAX_NAME_LENGTH),
    image: Joi.string().required(),
    sizes: Joi.array()
        .items(
            Joi.object({
                size: Joi.string().valid('SMALL', 'MEDIUM', 'LARGE').required(),
                price: Joi.number().positive().required(),
                status: Joi.string().valid('SOLDOUT', 'STOCKING').default('STOCKING'),
                sold: Joi.number().positive().min(0).default(0),
            }),
        )
        .required(),
    category: Joi.string().valid('PIZZA', 'DRINK', 'OTHERS').required(),
    description: Joi.string().min(PRODUCT.MIN_DESCRIPTION_LENGTH).max(PRODUCT.MAX_DESCRIPTION_LENGTH),
});

module.exports = { productValidation };
