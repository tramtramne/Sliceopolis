const express = require('express');
const router = express.Router();
const productsController = require('../controllers/product.controller');

router.get('/', productsController.getAllProduct);
router.get('/:id', productsController.getProductById);

module.exports = router;
