const userService = require('../services/user.service');
const { validateID } = require('../validators/index');
const { ErrorResponse, NotFoundResponse, BadRequest } = require('../common/error.response');
const { SuccessResponse } = require('../common/success.response');
const { registerValidator, editProfileValidator } = require('../validators');
const User = require('../models/User');
const { paginate } = require('../utils/pagination.js');
const { PAGE_SIZE } = require('../constants/index.js');
const getProfile = async (req, res, next) => {
    const { id } = req.user;

    if (!validateID(id)) {
        return next(new ErrorResponse('Invalid user ID', 422));
    }

    const user = await userService.getUserById(id);
    if (!user) {
        return next(new NotFoundResponse('User not found'));
    }
    const userProfile = {
        id: user._id,
        fullName: user.fullname,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
    };

    return new SuccessResponse({
        metadata: userProfile,
    }).send({ res });
};

const editProfile = async (req, res, next) => {
    const { id } = req.user || {};
    const body = req.body || {};

    if (Object.keys(body).length === 0 || !id) {
        throw new BadRequest('Body is empty');
    }
    if (!validateID(id)) {
        return next(new ErrorResponse('Invalid user ID', 422));
    }

    const userProfile = {
        fullname: body.fullname || undefined,
        phoneNumber: body.phoneNumber || undefined,
        address: body.address || undefined,
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
    const page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1;
    const result = await paginate(User, parseInt(page), parseInt(PAGE_SIZE));
    if (!result) {
        const error = new NotFoundResponse('Product not found');
        return next(error);
    }
    return new SuccessResponse({
        metadata: result,
    }).send({ req, res });
};
module.exports = {
    getProfile,
    editProfile,
    viewOrderHistory,
    getAllUser,
};
