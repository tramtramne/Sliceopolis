const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('./user.service');

const { ConflictResponse, BadRequest, AuthFailureResponse, NotFoundResponse } = require('../common/error.response');

class Auth {
    async register(user) {
        const existedUser = await userService.getOneUser({ phoneNumber: user.phoneNumber });
        if (existedUser) {
            throw new ConflictResponse('User already exists');
        }

        // hash password
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        // create user
        const newUser = await userService.createUser(user);
        return newUser;
    }

    async login(phoneNumber, password) {
        // check if user is existed
        const user = await userService.getOneUser({ phoneNumber });
        if (!user) {
            throw new NotFoundResponse('User not found');
        }

        // check password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new AuthFailureResponse('Wrong password');
        }

        // generate token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return token;
    }
}

module.exports = new Auth();
