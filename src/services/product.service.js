const productModel = require('../models/Product');
const { productValidation } = require('../validators/product.validator');
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
        const validateProduct = validateProduct(product);
        if (validateProduct) {
            throw new BadRequest(validateProduct);
        }
        const data = await productModel.create(product);
        return data;
    }
}

module.exports = new Product();
