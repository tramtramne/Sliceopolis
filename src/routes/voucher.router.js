const express = require('express');
const router = express.Router();
const vouchersController = require('../controllers/voucher.controller');

router.get('/:id', vouchersController.getVoucherByID);

module.exports = router;
