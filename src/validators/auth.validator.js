const Joi = require('joi');
const { USER } = require('../constants/index');
const User = require('../models/User');
const { BadRequest } = require('../common/error.response');

const validateInfoUser = Joi.object({
    fullname: Joi.string().min(USER.MIN_FULLNAME_LENGTH).max(USER.MAX_FULLNAME_LENGTH),
    phoneNumber: Joi.string()
        .length(10)
        .pattern(/(\+84|0[3|5|7|8|9])+([0-9]{8})\b/),
    password: Joi.string().min(USER.MIN_PASSWORD_LENGTH).max(USER.MAX_PASSWORD_LENGTH),
    address: Joi.string(),
    role: Joi.string().valid('USER', 'ADMIN', 'STAFF').default('USER'),
    updateAt: Joi.date(),
});

const validateRequired = Joi.object({
    fullname: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
});

const registerValidator = (user) => {
    var { error: requiredError, value: requiredValue } = validateRequired.validate(user);
    if (requiredError) {
        throw new BadRequest(requiredError);
    }
    var { error: infoError, value: infoValue } = validateInfoUser.validate(requiredValue);
    return { value: infoValue, error: infoError };
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
