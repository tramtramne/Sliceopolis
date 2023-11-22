const order = require('../models/Order');
const { validateOrder } = require('../validators/order.validator');
const { BadRequest } = require('../common/error.response');

class Order {
    createOrder(data) {
        const validateError = validateOrder(data);
        if (validateError) {
            throw new BadRequest(validateError);
        }
        const newOrder = order.create(data);
        return newOrder;
    }
    getAllOrder() {
        const orders = order.find({});
        return orders;
    }
    getOrderById(id) {
        const existedOrder = order.findById(id);
        return existedOrder;
    }
    getOrder(data) {
        const existedOrder = order.find(data);
        return existedOrder;
    }
}

module.exports = new Order();
