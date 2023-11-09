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
            const user = user.findById({ _id: [id] });
            return user;
        } catch (error) {
            throw error;
        }
    }
    getOneUser(data) {
        try {
            const user = user.findOne(data);
            return user
        } catch (error) {
            throw error
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
