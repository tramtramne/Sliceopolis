const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AuthFailureResponse, BadRequest } = require('../common/error.response');

const verifyToken = async (req, res, next) => {
    const token = req.headers['auth-token'];
    if (!token) {
        throw new AuthFailureResponse('Access denied');
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verified) {
        throw new BadRequest('Invalid token');
    }
    req.user = verified;
    next();
};

const checkRoles = (roles) => {
    return (req, res, next) => {
        const { user } = req;
        if (roles.indexOf(user.data.role) !== -1) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
};
module.exports = {
    verifyToken,
    checkRoles,
};
