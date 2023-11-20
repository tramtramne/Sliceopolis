const { createOrder, getAllOrder, getOrderById, getOrderByUserId } = require('../controllers/order.controller');
const router = require('express').Router();

router.post('/', createOrder);
router.get('/', getAllOrder);
router.get('/:id', getOrderById);
router.get('/users/:id', getOrderByUserId);

module.exports = router;
