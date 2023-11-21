// const { model } = require('mongoose');
// const productService = require('../services/product.service');

// const getAllProduct = async (req, res, next) => {
//     const data = await productService.getAllProduct();

//     new SuccessResponse({
//         metadata: data,
//     }).send({ res });
// };

const Product = require('../models/Product');
const { paginate } = require('../utils/pagination.js'); // Assuming the pagination function is in a separate file
const constants = require('../constants/index.js');
const PAGE_SIZE = constants.PAGE_SIZE;

const getAllProduct = async (req, res, next) => {
    const { page = 1 } = req.query;

    const result = await paginate(Product, parseInt(page), parseInt(PAGE_SIZE));
    res.status(200).json(result);
};

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract the id from the request parameters
        console.log({ id }, 111);
        const data = await productService.getProductById(id);
        if (!data) {
            return res.status(404).send('NOT FOUND');
        }
        return res.json(data);
    } catch (error) {
        console.log(error, 404);
        return res.status(404).send('NOT FOUND');
    }
};

module.exports = { getAllProduct, getProductById };
