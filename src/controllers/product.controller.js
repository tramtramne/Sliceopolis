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
const { validateProduct } = require('../validators/product.validator');
const getAllProduct = async (req, res, next) => {
    const page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1;
    const result = await paginate(Product, parseInt(page), parseInt(PAGE_SIZE));
    if (!result) {
        throw new NotFoundResponse('Product not found');
    }
    return new SuccessResponse({
        metadata: result,
    }).send({ req, res });
};

const getProductById = async (req, res, next) => {
    if (!req.params || !req.params.id) {
        throw new BadRequest('Bad request');
    }
    const { id } = req.params;
    if (!validateID(id)) {
        const error = new BadRequest('Invalid product ID');
        throw error;
    }
    const data = await productService.getProductById(id);

    if (!data) {
        throw new NotFoundResponse('Product not found');
    }
    new SuccessResponse({
        metadata: data,
    }).send({ res });
};

const deleteProductById = async (req, res, next) => {
    if (!req.params || !req.params.id) {
        throw new BadRequest('Bad request');
    }
    const { id } = req.params;
    if (!validateID(id)) {
        const error = new BadRequest('Invalid product ID');
        throw error;
    }
    const data = await productService.deleteProductById(id);
    if (!data) {
        throw new NotFoundResponse('Product not found');
    }
    return new SuccessResponse({
        metadata: data,
    }).send({ res });
};

const createProduct = async (req, res, next) => {
    const body = req.body || {};
    console.log(typeof body.sizes === 'string' ? JSON.parse(body.sizes) : body.sizes);
    if (body && Object.keys(body).length === 0) {
        throw new BadRequest();
    }

    var objectSize = typeof body.sizes === 'string' ? JSON.parse(body.sizes) : body.sizes;

    objectSize = objectSize.map((item) => {
        if (typeof item === 'string') {
            return JSON.parse(item);
        }
        return item;
    });
    var newProduct = {
        name: body.name,
        image: req.file?.filename || undefined,
        sizes: objectSize,
        category: body.category,
        description: body.description,
    };
    if (newProduct.image) {
        const { error, value } = validateProduct(newProduct);
        newProduct = value;
        if (error) {
            throw new BadRequest(error);
        }

        const uploadedResponse = await Upload.uploadFile(req.file.path).catch((error) => {});
        newProduct.image = uploadedResponse.secure_url;
        if (uploadedResponse.secure_url) {
            const product = await productService.createProduct(newProduct);
            return new SuccessResponse({
                metadata: product,
            }).send(req, res);
        } else {
            throw new UnprocessableContentResponse('Image is wrong');
        }
    } else {
        throw new UnprocessableContentResponse('Image is required');
    }
};

module.exports = { getAllProduct, getProductById, deleteProductById, createProduct };
