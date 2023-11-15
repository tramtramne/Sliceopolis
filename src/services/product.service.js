const productModel = require('../models/Product');

class Product {
    getAllProduct = async () => {
        try {
            const data = await productModel.find({});
            return data;
        } catch (error) {
            throw error;
        }
    };
    getProductById = async (id) => {
        const data = await productModel.findById(id).exec();
        return data;
    };
}

module.exports = new Product();
