const Joi = require('joi');
const { PRODUCT } = require('../constants/index');
const productValidation = Joi.object({
    name: Joi.string().required().min(PRODUCT.MIN_NAME_LENGTH).max(PRODUCT.MAX_NAME_LENGTH),
    image: Joi.required(),
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
const validateProduct = (product) => {
    console.log(product);
    const { error, value } = productValidation.validate(product);
    const lastItems = {};

    if (error) {
        return { error, value };
    }

    value.sizes.forEach((item) => {
        if (item.size) {
            lastItems[item.size] = item;
        }
    });

    value.sizes = Object.values(lastItems);

    return { error, value };
};
module.exports = { validateProduct };
