// const router = require('express').Router();
const homeRouter = require('./home.router');
const productRouter = require('./product.router');

function route(app) {
    app.use('/', homeRouter);
    app.use('/products', productRouter);
}

module.exports = route;
