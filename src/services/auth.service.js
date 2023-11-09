const bcrypt = require('bcryptjs');

class Auth {
    hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
    decodePassword(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword);
    }
}

module.exports = new Auth();