const {
    createOrder,
    getAllOrder,
    getOrderById,
    updateDeliveryStatus,
    addShipper,
} = require('../controllers/order.controller');
const { verifyToken, checkRoles } = require('../middlewares/authorization');
const asyncHandler = require('../middlewares/asyncHandler');

const router = require('express').Router();

router.post('/', asyncHandler(verifyToken), asyncHandler(createOrder));
router.get('/', asyncHandler(verifyToken), asyncHandler(checkRoles(['ADMIN', 'STAFF'])), asyncHandler(getAllOrder));

//ADMIN, STAFF,OWNER
router.get('/:orderId', asyncHandler(verifyToken), asyncHandler(getOrderById));

//ADMIN, STAFF
router.patch(
    '/:orderId/add-shipper',
    asyncHandler(verifyToken),
    asyncHandler(checkRoles(['ADMIN'])),
    asyncHandler(addShipper),
);
router.patch(
    '/:orderId/update-status-delivery',
    asyncHandler(verifyToken),
    asyncHandler(checkRoles(['ADMIN', 'STAFF'])),
    asyncHandler(updateDeliveryStatus),
);

module.exports = router;
