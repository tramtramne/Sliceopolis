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
const { validateID } = require('../validators/index.js');
const cloudinary = require('../utils/cloudinary');
const Upload = require('../helpers/upload');
const { uploadFile } = require('../helpers/upload');
const getAllProduct = async (req, res, next) => {
    const page = parseInt(req.query.page) >= 0 ? parseInt(req.query.page) : 1;
    const result = await paginate(Product, parseInt(page), parseInt(PAGE_SIZE));
    if (!result) {
        const error = new NotFoundResponse('Product not found');
        return next(error);
    }
    return new SuccessResponse({
        metadata: result,
    }).send({ req, res });
};

const getProductById = async (req, res, next) => {
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

const deleteProductById = async (req, res, next) => {
    if (!req.params || !req.params.id) {
        return next(new BadRequest('Bad request'));
    }
    const { id } = req.params;
    if (!validateID(id)) {
        const error = new BadRequest('Invalid product ID');
        return next(error);
    }
    const data = await productService.deleteProductById(id);
    if (!data) {
        return next(new NotFoundResponse('Product not found'));
    }
    return new SuccessResponse({
        metadata: data,
    }).send({ res });
};

const createProduct = async (req, res, next) => {
    const body = req.body || {};
    console.log('123456789', req.body);
    console.log(987654321, req.file.path);
    if (body && Object.keys(body).length === 0) {
        throw new BadRequest();
    }

    const newProduct = {
        name: body.name,
        image: req.file?.filename || undefined,
        sizes: body.sizes,
        category: body.category,
        description: body.description,
    };
    if (newProduct.image) {
        const uploadedResponse = await Upload.uploadFile(req.file.path).catch((error) => {});
        newProduct.image = uploadedResponse.secure_url;
        if (uploadedResponse) {
            const product = await productService.createProduct(newProduct);
            return new SuccessResponse({
                metadata: product,
            }).send(req, res);
        }
    } else {
        next(new UnprocessableContentResponse('Image is required'));
    }
};

module.exports = { getAllProduct, getProductById, deleteProductById, createProduct };
