// const express = require('express');
const router = require('express').Router();

const reportController = require('../controllers/report.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const { verifyToken, checkRoles } = require('../middlewares/authorization');

router.get(
    '/revenue',
    asyncHandler(verifyToken),
    asyncHandler(checkRoles(['ADMIN'])),
    asyncHandler(reportController.reportForRevenue),
);
router.get(
    '/product',
    asyncHandler(verifyToken),
    asyncHandler(checkRoles(['ADMIN'])),
    asyncHandler(reportController.reportForProduct),
);
module.exports = router;
