const { createOrder, getAllOrder, getOrderById } = require('../controllers/order.controller');
const router = require('express').Router();

router.post('/', createOrder);
// router.get('/', getAllOrder);
// router.get('/:id', getOrderById);

module.exports = router;
