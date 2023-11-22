const Joi = require('joi');

const registerSchema = Joi.object({
    fullname: Joi.string().required(),
    phoneNumber: Joi.string().length(10).pattern(/(\+84|0[3|5|7|8|9])+([0-9]{8})\b/).required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('USER', 'ADMIN', 'STAFF').required(),
});

const registerValidator = (user) => {
    const { error } = registerSchema.validate(user);
    return error;
};

module.exports = { registerValidator };
