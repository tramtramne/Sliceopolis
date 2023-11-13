// const router = require('express').Router();
const homeRouter = require('./home.router');
const productRouter = require('./product.router');
const voucherRouter = require('./voucher.router');
const authRouter = require('./auth.router');
function route(app) {
    app.use('/', homeRouter);
    app.use('/products', productRouter);
    app.use('/vouchers', voucherRouter);
    app.use('/auth', authRouter);
}

module.exports = route;
