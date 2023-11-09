const User = require('../services/user.service');
const Auth = require('../services/auth.service');

const signUp = async (req, res, next) => {
    try {
        let { fullname, phoneNumber, password } = req.body;
        password = Auth.hashPassword(password);
        await User.createUser({ fullname, phoneNumber, password });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log('🚀 ~ file: auth.controller.js:5 ~ signUp ~ error:', error);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log('🚀 ~ file: auth.controller.js:5 ~ signUp ~ error:', error);
        next(error);
    }
}

module.exports = { signUp };