const Product = require('../models/Product');
const { SuccessResponse } = require('../common/success.response');
const { BadRequest, UnprocessableContentResponse, NotFoundResponse } = require('../common/error.response');
const { paginate } = require('../utils/pagination.js'); // Assuming the pagination function is in a separate file
const { PAGE_SIZE } = require('../constants/index.js');

const getAllProduct = async (req, res, next) => {
    const { page = 1 } = req.query;

    const result = await paginate(Product, parseInt(page), parseInt(PAGE_SIZE));
    new SuccessResponse({
        metadata: result,
    }).send({ res });
};

const getProductById = async (req, res, next) => {
    if (!req.params) {
        throw new BadRequest('Bad request');
    }
    const { id } = req.params;
    const data = await productService.getProductById(id);
    if (!data) {
        throw new NotFoundResponse('Product not found');
    }
    return new SuccessResponse({
        metadata: data,
    }).send({ res });
};

module.exports = { getAllProduct, getProductById };
