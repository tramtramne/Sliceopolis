const user = require('../models/User');
const order = require('../models/Order');
class User {
    getAllUser() {
        try {
            const users = user.find({});
            return users;
        } catch (error) {
            throw error;
        }
    }
    getUserById(id) {
        try {
            const existedUser = user.findById(id);
            return existedUser;
        } catch (error) {
            throw error;
        }
    }
    getOneUser(data) {
        try {
            const existedUser = user.findOne({ phoneNumber: data.phoneNumber });
            console.log(existedUser);
            return existedUser;
        } catch (error) {
            throw error;
        }
    }
    createUser(data) {
        try {
            const newUser = user.create(data);
            return newUser;
        } catch (error) {
            throw error;
        }
    }
    viewOrderHistory(id) {
        try {
            const data = order.find({ id_user: id }).exec();
            return data;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new User();
