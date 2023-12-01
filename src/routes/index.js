const productRouter = require('./product.router');
const voucherRouter = require('./voucher.router');
const authRouter = require('./auth.router');
const orderRouter = require('./order.router');
const userRouter = require('./user.router');
const reportRouter = require('./report.router');
function route(app) {
    app.use('/products', productRouter);
    app.use('/vouchers', voucherRouter);
    app.use('/auth', authRouter);
    app.use('/orders', orderRouter);
    app.use('/users', userRouter);
    app.use('/reports', reportRouter);
}

module.exports = route;
