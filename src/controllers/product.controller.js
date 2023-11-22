const Product = require('../models/Product');
const { SuccessResponse } = require('../common/success.response');
const {
    BadRequest,
    UnprocessableContentResponse,
    NotFoundResponse,
    ErrorResponse,
} = require('../common/error.response');
const { paginate } = require('../utils/pagination.js');
const { PAGE_SIZE } = require('../constants/index.js');
const productService = require('../services/product.service');
const { validateID } = require('../validates/index.js');
const getAllProduct = async (req, res, next) => {
    const { page = 1 } = req.query || {};
    const result = await paginate(Product, parseInt(page), parseInt(PAGE_SIZE));
    new SuccessResponse({
        metadata: result,
    }).send({ res });
};

const getProductById = async (req, res, next) => {
    console.log(123, 234);
    if (!req.params || !req.params.id) {
        return next(new BadRequest('Bad request'));
    }
    const { id } = req.params;
    if (!validateID(id)) {
        // khi có lỗi xảy ra, nó sẽ được chuyển đến middleware xử lý lỗi và trả về một thông báo lỗi cho client
        const error = new BadRequest('Invalid product ID');
        return next(error);
    }
    const data = await productService.getProductById(id);
    console.log(data);
    if (!data) {
        return next(new NotFoundResponse('Product not found'));
    }
    new SuccessResponse({
        metadata: data,
    }).send({ res });
};

module.exports = { getAllProduct, getProductById };
