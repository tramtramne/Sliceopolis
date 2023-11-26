const {
    createOrder,
    getAllOrder,
    getOrderById,
    getOrderByUserId,
    updateDeliveryStatus,
} = require('../controllers/order.controller');
const { verifyToken, checkRoles } = require('../middlewares/authorization');
const asyncHandler = require('../middlewares/asyncHandler');

const router = require('express').Router();

router.post('/', asyncHandler(verifyToken), asyncHandler(createOrder));
router.get('/', asyncHandler(verifyToken), asyncHandler(checkRoles(['ADMIN', 'STAFF'])), asyncHandler(getAllOrder));

//ADMIN, STAFF,OWNER
router.get('/:orderId', asyncHandler(verifyToken), asyncHandler(getOrderById));
//ADMIN, STAFF
router.put(
    '/:orderId/updateDeliveryStatus',
    asyncHandler(verifyToken),
    asyncHandler(checkRoles(['ADMIN', 'STAFF'])),
    asyncHandler(updateDeliveryStatus),
);

module.exports = router;
