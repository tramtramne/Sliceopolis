const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['auth-token'];

    if (!token) return res.status(401).send('Access Denied');

    console.log('🚀 ~ file: authJWT.js:verifyToken', token);

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
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
