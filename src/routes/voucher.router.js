const express = require('express');
const router = express.Router();
const vouchersController = require('../controllers/voucher.controller');
const asyncHandler = require('../middlewares/asyncHandler');
router.get('/:id', asyncHandler(vouchersController.getVoucherById));
router.post('/applyVoucher', asyncHandler(vouchersController.applyVoucherToOrder));
router.get('/', asyncHandler(vouchersController.getAllVoucher));
module.exports = router;
