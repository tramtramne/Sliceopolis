const { model } = require('mongoose');
const productService = require('../services/product.service');

const getAllProduct = async (req, res, next) => {
    try {
        const data = await productService.getAllProduct();
        return res.json(data);
    } catch (error) {
        return res.status(404).send('NOT FOUND');
    }
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
