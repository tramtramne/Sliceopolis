const { model } = require('mongoose');
const productService = require('../services/product.service');

const getAllProduct = async (req, res, next) => {
    try {
        const data = await productService.getAllProduct();
        return res.json(data);
    } catch (error) {
<<<<<<< HEAD
        return res.status(404).send('NOT FOUND');
=======
        next(error);
>>>>>>> dev
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params; // Extract the id from the request parameters
        console.log({ id }, 111);
        const data = await productService.getProductById(id);
        if (!data) {
        }
        console.log({ data }, 222);
        return res.json(data);
    } catch (error) {
<<<<<<< HEAD
        console.log(error, 404);
        return res.status(404).send('NOT FOUND');
=======
        next(error);
>>>>>>> dev
    }
};

module.exports = { getAllProduct, getProductById };
