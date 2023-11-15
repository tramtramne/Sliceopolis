const { createOrder } = require('../controllers/order.controller');
const router = require('express').Router();

router.post('/', createOrder);

module.exports = router;
