const productModel = require('../models/Product');

class Product {
    getAllProduct = async () => {
        try {
            const data = await productModel.find({});

            return data;
        } catch (error) {
            console.error('Error retrieving data:', error);
            throw error;
        }
    };
    getProductById = async (id) => {
        try {
            const data = await productModel.findById(id).exec();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error retrieving data:', error);
            throw error;
        }
    };
}

module.exports = new Product();
