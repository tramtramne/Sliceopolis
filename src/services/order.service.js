const order = require('../models/Order');

class Order {
    createOrder(data) {
        try {
            const newOrder = order.create(data);
            return newOrder;
        } catch (error) {
            throw error;
        }
    }
    getAllOrder() {
        try {
            const orders = order.find({});
            return orders;
        } catch (error) {
            throw error;
        }
    }
    getOrderById(id) {
        try {
            const existedOrder = order.findById(id);
            return existedOrder;
        } catch (error) {
            throw error;
        }
    }
    getOrder(data) {
        try {
            const existedOrder = order.find(data);
            return existedOrder;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Order();
