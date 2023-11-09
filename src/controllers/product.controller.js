const { model } = require('mongoose');
const productService = require('../services/product.service');

const getAllProduct = async (req, res, next) => {
    try {
        const data = await productService.getAllProduct();
        return res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract the id from the request parameters
        const data = await productService.getProductById(id); // Pass the id to the getDetailProduct function
        return res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        next(error);
    }
};

module.exports = { getAllProduct, getProductById };
