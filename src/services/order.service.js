const order = require('../models/Order');

class Order {
    createOrder(data) {
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
    addShipper(id, data) {
        const updatedOrder = order.findByIdAndUpdate(id, data, { new: true });
        return updatedOrder;
    }
}

module.exports = new Order();
