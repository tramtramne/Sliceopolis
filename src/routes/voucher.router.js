const express = require('express');
const router = express.Router();
const vouchersController = require('../controllers/voucher.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const { verifyToken, checkRoles } = require('../middlewares/authorization');
router.get('/:id', asyncHandler(vouchersController.getVoucherById));
router.get(
    '/',
    asyncHandler(verifyToken),
    asyncHandler(checkRoles(['ADMIN', 'STAFF'])),
    asyncHandler(vouchersController.getAllVoucher),
);

router.post(
    '/',
    asyncHandler(verifyToken),
    asyncHandler(checkRoles(['ADMIN'])),
    asyncHandler(vouchersController.createVoucher),
);
module.exports = router;
