const Joi = require('joi');
const { USER } = require('../constants/index');
const User = require('../models/User');
const { BadRequest } = require('../common/error.response');
const userService = require('../services/user.service');
const validateInfoUser = Joi.object({
    fullname: Joi.string().min(USER.MIN_FULLNAME_LENGTH).max(USER.MAX_FULLNAME_LENGTH),
    phoneNumber: Joi.string()
        .length(10)
        .pattern(/(\+84|0[3|5|7|8|9])+([0-9]{8})\b/),
    password: Joi.string().min(USER.MIN_PASSWORD_LENGTH).max(USER.MAX_PASSWORD_LENGTH),
    address: Joi.string(),
    role: Joi.string().valid('USER', 'ADMIN', 'STAFF'),
    updateAt: Joi.date(),
});

const validateRequired = Joi.object({
    fullname: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
});

const registerValidator = (user) => {
    const { error } = validateInfoUser.validate(user);
    return error;
};
const editProfileValidator = async (user) => {
    if (user.phoneNumber) {
        const tempUser = await User.findOne({ phoneNumber: user.phoneNumber });

        if (tempUser) {
            throw new BadRequest('Phone number already exists');
        }
    }

    const { error } = validateInfoUser.validate(user);
    return error;
};

module.exports = { registerValidator, editProfileValidator };
