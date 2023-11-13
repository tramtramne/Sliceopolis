const user = require('../models/User');
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
            const existedUser = user.findById({ _id: [id] });
            return existedUser;
        } catch (error) {
            throw error;
        }
    }
    getOneUser(data) {
        try {
            const existedUser = user.findOne(data)
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
}

module.exports = new User();
