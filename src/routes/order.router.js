<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/product.controller');

router.get('/', productsController.getAllProduct);
router.get('/:id', productsController.getProductById);
=======
const { createOrder } = require('../controllers/order.controller');
const router = require('express').Router();

router.post('/', createOrder);
>>>>>>> dev

module.exports = router;
