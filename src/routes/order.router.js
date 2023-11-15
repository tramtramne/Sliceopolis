const { createOrder } = require('../controllers/order.controller');
const router = require('express').Router();

router.post('/orders', createOrder);

module.exports = router;
