const express = require('express');
const router = express.Router();
const productsController = require('../controllers/product.controller');
const asyncHandler = require('../middlewares/asyncHandler');
router.get('/', asyncHandler(productsController.getAllProduct));
router.get('/:id', asyncHandler(productsController.getProductById));

module.exports = router;
