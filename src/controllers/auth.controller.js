const User = require('../services/user.service');
const Auth = require('../services/auth.service');

const signUp = async (req, res, next) => {
    try {
        let { fullname, phoneNumber, password, role, avatar } = req.body;

        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long!');
        }
        if (phoneNumber.length > 15) {
            throw new Error('Phone number is not invalid!');
        }
        let user = await User.getOneUser({ phoneNumber });
        if (user) {
            throw new Error('User already exists');
        }
        password = Auth.hashPassword(password);
        await User.createUser({ fullname, phoneNumber, password, role, avatar });
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log('🚀 ~ file: auth.controller.js:5 ~ signUp ~ error:', error);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        let { phoneNumber, password } = req.body;
        const user = await User.getOneUser({ phoneNumber });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = Auth.decodePassword(password, user.password);
        if (!isMatch) {
            throw new Error('Wrong password');
        }
        const token = Auth.generateToken(user);
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        console.log('🚀 ~ file: auth.controller.js:5 ~ signUp ~ token:', token);
        return res.status(200).json({ message: 'Login successfully' });
    } catch (error) {
        console.log('🚀 ~ file: auth.controller.js:5 ~ signUp ~ error:', error);
        next(error);
    }
};

module.exports = { signUp, login };
