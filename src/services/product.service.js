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
    async getProductByIds(ids) {
        const data = await productModel.find({ _id: { $in: ids } }).exec();
        return data;
    }
    async deleteProductById(id) {
        const data = await productModel.findByIdAndDelete(id).exec();
        return data;
    }
    async createProduct(product) {
        const data = await productModel.create(product);
        return data;
    }
    async updateProduct(id, product) {
        const data = await productModel.findByIdAndUpdate(id, product).exec();
        return data;
    }
}

module.exports = new Product();
