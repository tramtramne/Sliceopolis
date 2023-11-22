const { createOrder, getAllOrder, getOrderById, getOrderByUserId } = require('../controllers/order.controller');
const { verifyToken } = require('../middlewares/authorization');
const asyncHandler = require('../middlewares/asyncHandler');
const router = require('express').Router();

router.post('/', asyncHandler(verifyToken), asyncHandler(createOrder));
router.get('/', asyncHandler(verifyToken), asyncHandler(getAllOrder));
router.get('/:orderId', asyncHandler(verifyToken), asyncHandler(getOrderById));
router.get('/users/:userId', asyncHandler(verifyToken), asyncHandler(getOrderByUserId));

module.exports = router;
