const productModel = require('../models/Product');

class Product {
    async getAllProduct() {
        const data = await productModel.find({});
        return data;
    }
    async getProductById(id) {
        const data = await productModel.findById(id).exec();
        return data;
    }
    async deleteProductById(id) {
        const data = await productModel.findByIdAndDelete(id).exec();
        return data;
    }
}

module.exports = new Product();
