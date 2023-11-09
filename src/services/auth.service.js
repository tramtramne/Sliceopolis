const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Auth {
    hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
    decodePassword(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword);
    }
    generateToken(user) {
        return jwt.sign({ data: user }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
    }
}

module.exports = new Auth();