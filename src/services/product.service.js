const productModel = require('../models/Product');
const { validateProduct } = require('../validators/product.validator');
const { BadRequest } = require('../common/error.response');
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
    async createProduct(product) {
        const validate = validateProduct(product);
        if (validate) {
            throw new BadRequest(validate);
        }
        const data = await productModel.create(product);
        return data;
    }
}

module.exports = new Product();
