const userService = require('../services/user.service');
const { validateID } = require('../validators/index');
const { ErrorResponse, NotFoundResponse, BadRequest } = require('../common/error.response');
const { SuccessResponse } = require('../common/success.response');
const { registerValidator, editProfileValidator } = require('../validators');
const User = require('../models/User');

const getProfile = async (req, res, next) => {
    const { id } = req.user;

    if (!validateID(id)) {
        return next(new ErrorResponse('Invalid user ID', 422));
    }

    const body = req.body || {};

    const user = await userService.getUserById(id);

    const newProfile = {
        fullname: body.fullname || user.fullname,
        phoneNumber: body.phoneNumber || user.phoneNumber,
        address: body.address || user.address,
    };
    if (!user) {
        return next(new NotFoundResponse('User not found'));
    }
    const userProfile = {
        fullName: user.fullname,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
    };
    console.log(userProfile);
    return new SuccessResponse({
        metadata: userProfile,
    }).send({ res });
};

const editProfile = async (req, res, next) => {
    const { id } = req.user || {};
    const body = req.body || {};

    console.log(Object.keys(body).length === 0);
    if (Object.keys(body).length === 0 || !id) {
        throw new BadRequest('Body is empty');
    }
    if (!validateID(id)) {
        return next(new ErrorResponse('Invalid user ID', 422));
    }

    const userProfile = {
        fullname: body.fullname,
        phoneNumber: body.phoneNumber,
        address: body.address,
        updateAt: Date.now(),
    };

    const validateInfo = await editProfileValidator(userProfile);
    if (validateInfo) {
        throw new BadRequest(validateInfo);
    }
    const user = await User.findByIdAndUpdate(id, { $set: userProfile }, { new: true });

    if (!user) {
        return new ErrorResponse('User not found', 404);
    }
    return new SuccessResponse({
        metadata: user,
    }).send({ res });
};

const viewOrderHistory = async (req, res, next) => {
    const { id } = req.user || {};
    if (!validateID(id)) {
        return next(new ErrorResponse('Invalid user ID', 422));
    }
    const data = await userService.viewOrderHistory(id);
    if (!data) {
        return next(new NotFoundResponse('User not found'));
    }
    return new SuccessResponse({
        metadata: data,
    }).send({ res });
};

const getAllUser = async (req, res, next) => {
    const data = await userService.getAllUser();
    if (!data) {
        return next(new NotFoundResponse('User not found'));
    }
    return new SuccessResponse({
        metadata: {
            data: data,
            total: data.length,
        },
    }).send({ res });
};
module.exports = {
    getProfile,
    editProfile,
    viewOrderHistory,
    getAllUser,
};
